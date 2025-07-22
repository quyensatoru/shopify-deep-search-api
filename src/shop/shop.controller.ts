import {Body, Controller, Post} from '@nestjs/common';
import {ShopService} from "./shop.service";
import {CreateShopDto} from "./dto/create-shop.dto";
import {ShopifyProductService} from "../shopify/product/product.service";
import {ShopifyShopService} from "../shopify/shop/shop.service";

@Controller('shop')
export class ShopController {
    constructor(
        private readonly shopService: ShopService,
        private readonly shopifyProductService: ShopifyProductService,
        private readonly shopifyShopService: ShopifyShopService,
    ) {}

    @Post()
    async create(@Body() body: CreateShopDto) {
        let shop = await this.shopService.findOne({
            domain: body.shop
        });

        console.log(shop);

        let isUpdated = false;
        if(!shop || !shop.status) {
            isUpdated = true;
        }

        shop = await this.shopService.upsert({
            domain: body.shop,
        }, {
            accessToken: body.accessToken,
            status: true,
        })

        if(isUpdated) {
            const shopResource = await this.shopifyShopService.getShop(shop.domain, shop.accessToken);
            console.log(shopResource);
            if(shopResource) {
                shop.set('shopUrl', shopResource.url);
                shop.set('currencyCode', shopResource.currencyCode);
                shop.set('currencyFormat', shopResource.currencyFormats?.moneyFormat);
                shop.set('email', shopResource.email);
                shop.set('shopifyShopId', shopResource.id);
                await shop.save();
            }

            const res = await this.shopifyProductService.bulkOperationRunQuery(shop.domain, shop.accessToken);
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
