import {Injectable, Logger, OnApplicationBootstrap} from "@nestjs/common";
import { QueueService } from "../queue.service";
import { ShopDocument } from "../../shop/schemas/shop.schema";
import { Channel } from "amqplib"
import { ShopifyProductService } from "../../shopify/product/product.service";
import axios from "axios";
import * as readline from "node:readline";
import {CollectionResourceNode, ProductResourceNode, VariantResourceNode} from "../../shopify/product/product.type";
import { SearchService } from "../../search/search.service";

@Injectable()
export class ShopChannelService implements OnApplicationBootstrap {
    private readonly queueName: string;
    private readonly logger = new Logger(ShopChannelService.name);

    constructor(
        private readonly queueService: QueueService,
        private readonly shopifyProductService: ShopifyProductService,
        private readonly searchService: SearchService,
    ) {
        this.queueName = 'queue_shop';
    }

    onApplicationBootstrap(): void {
        this.queueService.consume<ShopDocument>(this.queueName, 5, this.productBulkOperationQuery.bind(this));
    }

    private async productBulkOperationQuery(channel: Channel, shop: ShopDocument) {
        try {
            const retrieveBulkData = await this.shopifyProductService.bulkOperationRetrieveQuery(
                shop.domain,
                shop.accessToken,
                shop.productBulkOperation
            );

            if(retrieveBulkData?.url) {
                const response = await axios.get(retrieveBulkData.url, {
                    responseType: 'stream',
                });

                const rl = readline.createInterface({
                    input: response.data,
                    crlfDelay: Infinity,
                });
                let product: ProductResourceNode | undefined;
                let variants: VariantResourceNode[] = [];
                let collections: CollectionResourceNode[] = [];
                for await (const line of rl) {
                    if (!line.trim()) continue;
                    const resource = JSON.parse(line) as ProductResourceNode | VariantResourceNode | CollectionResourceNode;
                    if(!resource.hasOwnProperty("__parentId")) {
                        if(product) {
                            product.variants = variants;
                            product.collections = collections;
                            await this.searchService.saveAndIndexProduct(product);
                            product = undefined;
                            variants = [];
                            collections = [];
                        }
                        product = resource as ProductResourceNode;
                    } else {
                        const relationResource =  resource as VariantResourceNode | CollectionResourceNode;
                        if(relationResource.id.includes('gid:\/\/shopify\/ProductVariant\/')) {
                            const variant = relationResource as VariantResourceNode;
                            delete variant.__parentId;
                            variants.push(variant);
                        } else if(relationResource.id.includes('gid:\/\/shopify\/Collection\/')) {
                            const collection = relationResource as CollectionResourceNode;
                            delete collection.__parentId;
                            collections.push(collection);
                        }
                    }
                }
                if(product) {
                    product.variants = variants;
                    product.collections = collections;
                    await this.searchService.saveAndIndexProduct(product);
                }
            }
        } catch (e) {
            this.logger.error(e);
        }
    }

    async sendToQueue(payload: ShopDocument) {
        await this.queueService.sendToQueue(this.queueName, payload);
    }
}