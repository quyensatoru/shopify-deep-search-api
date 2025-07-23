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
import { TemplateModule } from './template/template.module';

@Module({
  imports: [
      ConfigModule,
      ShopModule,
      DatabaseModule,
      WebhookModule,
      QueueModule,
      UtilModule,
      ShopifyModule,
      TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
