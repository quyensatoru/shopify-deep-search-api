import {Injectable, Logger, OnApplicationBootstrap, OnModuleInit} from "@nestjs/common";
import { QueueService } from "../queue.service";
import { ShopDocument } from "../../shop/schemas/shop.schema";
import { Channel } from "amqplib"
import { ProductService } from "../../shopify/product/product.service";

@Injectable()
export class ShopChannelService implements OnApplicationBootstrap {
    private readonly queueName: string;
    private readonly logger = new Logger(ShopChannelService.name);

    constructor(
        private readonly queueService: QueueService,
        private readonly productService: ProductService,
    ) {
        this.queueName = 'queue_shop';
    }

    onApplicationBootstrap(): void {
        this.queueService.consume<ShopDocument>(this.queueName, 5, this.productBulkOperationQuery)
    }

    private async productBulkOperationQuery(channel: Channel, shop: ShopDocument) {
        try {
            const retrieveBulkData = await this.productService.bulkOperationRetrieveQuery(
                shop.domain,
                shop.accessToken,
                shop.productBulkOperation
            );

            if(retrieveBulkData?.url) {

            }
        } catch (e) {
            this.logger.error(e);
        }
    }

    async sendToQueue(payload: ShopDocument) {
        await this.queueService.sendToQueue(this.queueName, payload);
    }
}