import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import {ShopChannelService} from "./channel/shop.channel";
import {ShopifyProductModule} from "../shopify/product/product.module";

@Module({
  imports: [ShopifyProductModule],
  providers: [ShopChannelService, QueueService],
  exports: [ShopChannelService],
})
export class QueueModule {}
