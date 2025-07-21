import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import {ProductService} from "./product/product.service";

@Module({
  imports: [ProductModule],
  providers: [ProductService],
  exports: [ProductModule]
})
export class ShopifyModule {}
