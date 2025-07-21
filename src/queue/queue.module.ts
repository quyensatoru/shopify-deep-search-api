import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import {ShopChannelService} from "./channel/shop.channel";
import {ShopifyModule} from "../shopify/shopify.module";

@Module({
  imports: [ShopifyModule],
  providers: [ShopChannelService, QueueService],
  exports: [ShopChannelService]
})
export class QueueModule {}
