import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Template {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Object, required: true })
  content: any; // tiptap json

  @Prop([String])
  tags: string[];

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;
}

export type TemplateDocument = Template & Document;
export const TemplateSchema = SchemaFactory.createForClass(Template); 