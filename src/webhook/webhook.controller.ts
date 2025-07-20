import { Body, Controller, Post } from '@nestjs/common';
import { BulkQueryFinishDto } from "./dto/bulk-query-finish.dto";

@Controller('webhook')
export class WebhookController {
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
        return true
    }
}
