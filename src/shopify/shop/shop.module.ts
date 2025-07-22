import { Module } from '@nestjs/common';
import { ShopifyShopService } from './shop.service';

@Module({
  providers: [ShopifyShopService],
  exports: [ShopifyShopService],
})
export class ShopifyShopModule {}
