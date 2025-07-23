import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class SearchProduct {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  title: string;

  @Prop()
  handle: string;

  @Prop()
  description: string;

  @Prop([String])
  tags: string[];

  @Prop()
  status: string;

  @Prop()
  vendor: string;

  @Prop({ type: Object })
  seo: {
    title: string;
    description: string;
  };

  @Prop({ type: Object })
  variantsCount: {
    count: number;
    precision: string;
  };

  @Prop({ type: Object })
  priceRangeV2: {
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };

  @Prop({ type: Object })
  variants: any;

  @Prop({ type: Object })
  options: any;

  @Prop({ type: Object })
  category: {
    name: string;
    fullName: string;
    level: number;
    isArchived: boolean;
  };

  @Prop({ type: Object })
  collections: any;
}

export type SearchProductDocument = SearchProduct & Document;
export const SearchProductSchema = SchemaFactory.createForClass(SearchProduct); 