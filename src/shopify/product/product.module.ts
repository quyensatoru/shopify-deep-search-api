import { Module } from '@nestjs/common';
import { ShopifyProductService } from './product.service';

@Module({
  providers: [ShopifyProductService],
  exports: [ShopifyProductService]
})
export class ShopifyProductModule {}
