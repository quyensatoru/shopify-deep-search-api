import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { WebhookModule } from './webhook/webhook.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from './config/config.module';
import { QueueModule } from './queue/queue.module';
import { UtilModule } from './util/util.module';
import { ShopifyModule } from './shopify/shopify.module';

@Module({
  imports: [
      ConfigModule,
      ShopModule,
      DatabaseModule,
      WebhookModule,
      QueueModule,
      UtilModule,
      ShopifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
