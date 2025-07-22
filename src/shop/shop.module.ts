import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Shop, ShopSchema } from "./schemas/shop.schema";
import { ShopController } from './shop.controller';
import { ShopifyProductModule } from "../shopify/product/product.module";
import {ShopifyShopModule} from "../shopify/shop/shop.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Shop.name, schema: ShopSchema}]),
      ShopifyProductModule,
      ShopifyShopModule,
  ],
  providers: [ShopService],
  controllers: [ShopController],
  exports: [ShopService]
})
export class ShopModule {}
