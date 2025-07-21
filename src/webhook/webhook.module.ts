import {Module} from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import {ShopModule} from "../shop/shop.module";
import {QueueModule} from "../queue/queue.module";

@Module({
  imports: [QueueModule, ShopModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
