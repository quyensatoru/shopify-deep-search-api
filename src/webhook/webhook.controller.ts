import { Body, Controller, Post } from '@nestjs/common';
import { BulkQueryFinishDto } from "./dto/bulk-query-finish.dto";
import {ShopService} from "../shop/shop.service";
import {ShopChannelService} from "../queue/channel/shop.channel";

@Controller('webhook')
export class WebhookController {
    constructor(
        private readonly shopService: ShopService,
        private readonly shopChannelService: ShopChannelService,
    ) {}

    @Post('orders/paid')
    async ordersPaid() {
        return true
    }

    @Post('app/uninstalled')
    async appUninstalled(@Body() body: any) {
        console.log(body);
        return true
    }

    @Post('bulk_operations/finish')
    async bulkOperationsFinish(@Body() body: BulkQueryFinishDto) {
        console.log(body);
        const shop = await this.shopService.findOne({
            productBulkOperation: body.admin_graphql_api_id
        })

        if(shop) {
            await this.shopChannelService.sendToQueue(shop)
        }
        return true
    }
}
