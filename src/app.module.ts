import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShopModule } from './shop/shop.module';
import { DatabaseModule } from './core/infrastructure/database/database.module';
import { ConfigModule } from "@nestjs/config";
import { WebhookModule } from './webhook/webhook.module';
import { RabbitMqModule } from './core/infrastructure/rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      ShopModule,
      DatabaseModule,
      WebhookModule,
      RabbitMqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
