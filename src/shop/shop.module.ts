import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Shop, ShopSchema } from "./schemas/shop.schema";
import { ShopController } from './shop.controller';
import {ProductService} from "../shopify/product/product.service";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Shop.name, schema: ShopSchema}]),
  ],
  providers: [ShopService, ProductService],
  controllers: [ShopController]
})
export class ShopModule {}
