import {Body, Controller, Post} from '@nestjs/common';
import {ShopService} from "./shop.service";
import {CreateShopDto} from "./dto/create-shop.dto";
import {ProductService} from "../shopify/product/product.service";

@Controller('shop')
export class ShopController {
    constructor(
        private readonly shopService: ShopService,
        private readonly productService: ProductService
    ) {}

    @Post()
    async create(@Body() body: CreateShopDto) {
        let shop = await this.shopService.findOne({
            domain: body.shop
        });

        let isUpdated = false;
        if(!shop || !shop.status) {
            isUpdated = true;
        }

        shop = await this.shopService.update({
            domain: body.shop,
        }, {
            accessToken: body.accessToken,
            status: true,
        })

        if(isUpdated) {
            const res = await this.productService.bulkOperationRunQuery(shop.domain, shop.accessToken);
            if(res?.bulkOperation.id) {
                shop.set('productBulkOperation', res?.bulkOperation.id).save();
            }
        }

        return {
            message: 'OK',
            payload: shop
        }
    }
}
