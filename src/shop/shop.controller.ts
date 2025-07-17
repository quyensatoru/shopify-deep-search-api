import {Body, Controller, Post} from '@nestjs/common';
import {ShopService} from "./shop.service";
import {CreateShopDto} from "./dto/create-shop.dto";

@Controller('shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) {}

    @Post()
    async create(@Body() body: CreateShopDto) {
        const shop = await this.shopService.create({
            domain: body.shop,
            accessToken: body.accessToken,
            status: true
        })

        return {
            message: 'OK',
            payload: shop
        }
    }
}
