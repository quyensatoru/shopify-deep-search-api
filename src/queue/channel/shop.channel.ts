import {Injectable, Logger, OnApplicationBootstrap} from "@nestjs/common";
import { QueueService } from "../queue.service";
import { ShopDocument } from "../../shop/schemas/shop.schema";
import { Channel } from "amqplib"
import { ShopifyProductService } from "../../shopify/product/product.service";
import axios from "axios";
import * as readline from "node:readline";
import {ProductResourceNode} from "../../shopify/product/product.type";

@Injectable()
export class ShopChannelService implements OnApplicationBootstrap {
    private readonly queueName: string;
    private readonly logger = new Logger(ShopChannelService.name);

    constructor(
        private readonly queueService: QueueService,
        private readonly shopifyProductService: ShopifyProductService,
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

                for await (const line of rl) {
                    if (!line.trim()) continue;
                    const product = JSON.parse(line) as ProductResourceNode;
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