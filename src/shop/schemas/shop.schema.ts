import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

@Schema({ _id: true, timestamps: true, versionKey: false })
export class Shop {
    @Prop({ required: true, unique: true, type: String })
    domain: string;

    @Prop({ required: true, type: String })
    accessToken: string;

    @Prop({ required: true, type: Boolean })
    status: boolean;

    @Prop({ required: true, type: String })
    shopUrl: string;

    @Prop({ required: true, type: String })
    currencyCode: string;

    @Prop({ required: true, type: String })
    currencyFormat: string;

    @Prop({ required: true, type: String })
    email: string;

    @Prop({ required: true, type: String })
    shopifyShopId: string;

    @Prop({ type: String })
    productBulkOperation: string;
}

export type ShopDocument = HydratedDocument<Shop>;
export const ShopSchema = SchemaFactory.createForClass(Shop);

ShopSchema.index({ domain: 1 });