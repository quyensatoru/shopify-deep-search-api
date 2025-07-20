import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import {ShopChannelService} from "./channel/shop.channel";

@Module({
  providers: [ShopChannelService, QueueService],
})
export class QueueModule {}
