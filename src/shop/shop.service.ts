import { Injectable } from '@nestjs/common';
import {Shop, ShopDocument} from "./schemas/shop.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class ShopService {
    constructor(@InjectModel(Shop.name) private readonly shopModel: Model<ShopDocument>) {}

    create(shop: Partial<ShopDocument>) {
        return this.shopModel.create(shop);
    }
}
