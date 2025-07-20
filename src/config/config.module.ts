import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import databaseConfig from "../database/database.config";
import queueConfig from "../queue/queue.config";
import shopifyConfig from "../shopify/shopify.config";

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            load: [
                databaseConfig,
                queueConfig,
                shopifyConfig
            ]
        }),
    ]
})
export class ConfigModule {}
