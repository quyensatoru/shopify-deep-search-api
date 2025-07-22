import { Injectable } from '@nestjs/common';
import {Shop, ShopDocument} from "./schemas/shop.schema";
import {FilterQuery, Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class ShopService {
    constructor(@InjectModel(Shop.name) private readonly shopModel: Model<ShopDocument>) {}

    findOne(filter: FilterQuery<Shop>) {
        return this.shopModel.findOne(filter);
    }

    create(shop: Partial<Shop>) {
        return this.shopModel.create(shop);
    }

    upsert(filter: FilterQuery<Shop>, update: Partial<Shop>) {
        return this.shopModel.findOneAndUpdate(filter, update, { upsert: true, new: true });
    }
}
