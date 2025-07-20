import {Injectable, Logger, OnApplicationBootstrap, OnModuleInit} from "@nestjs/common";
import { QueueService } from "../queue.service";
import { ShopDocument } from "../../shop/schemas/shop.schema";
import { Channel } from "amqplib"
import { ConfigService } from "@nestjs/config";
import { AllConfig } from "../../config/config.type";
import { ProductService } from "../../shopify/product/product.service";

@Injectable()
export class ShopChannelService implements OnApplicationBootstrap {
    private readonly queueName: string;
    private readonly logger = new Logger(ShopChannelService.name);

    constructor(
        private configService: ConfigService<AllConfig>,
        private readonly queueService: QueueService,
    ) {
        this.queueName = 'queue_shop';
    }

    onApplicationBootstrap(): void {
        this.queueService.consume<ShopDocument>(this.queueName, this.productBulkOperationQuery)
    }

    async productBulkOperationQuery(channel: Channel, data: ShopDocument) {
        try {

        } catch (e) {
            this.logger.error(e);
        }
    }
}