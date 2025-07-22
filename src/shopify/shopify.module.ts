import { Module } from '@nestjs/common';
import { ShopifyProductModule } from './product/product.module';
import { ShopifyShopModule } from './shop/shop.module';

@Module({
  imports: [ShopifyProductModule, ShopifyShopModule],
})
export class ShopifyModule {}
