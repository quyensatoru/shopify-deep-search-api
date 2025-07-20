import { DatabaseConfig } from "../database/database.config";
import { QueueConfig } from "../queue/queue.config";
import {ShopifyConfig} from "../shopify/shopify.config";

export type AllConfig = {
    database: DatabaseConfig,
    queue: QueueConfig,
    shopify: ShopifyConfig,
}