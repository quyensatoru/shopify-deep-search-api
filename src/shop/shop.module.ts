import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Shop, ShopSchema } from "./schemas/shop.schema";
import { ShopController } from './shop.controller';
import {ProductService} from "../shopify/product/product.service";
import {ProductModule} from "../shopify/product/product.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Shop.name, schema: ShopSchema}]),
      ProductModule,
  ],
  providers: [ShopService],
  controllers: [ShopController],
  exports: [ShopService]
})
export class ShopModule {}
