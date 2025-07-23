import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import {ShopChannelService} from "./channel/shop.channel";
import {ShopifyProductModule} from "../shopify/product/product.module";
import { SearchModule } from '../search/search.module';

@Module({
  imports: [ShopifyProductModule, SearchModule],
  providers: [ShopChannelService, QueueService],
  exports: [ShopChannelService],
})
export class QueueModule {}
