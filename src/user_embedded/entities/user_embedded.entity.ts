import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProductEmbedded {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

}

@Schema()
export class UserEmbedded extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [ProductEmbedded], default: [] })
  products: ProductEmbedded[];
}

export const UserEmbeddedSchema = SchemaFactory.createForClass(UserEmbedded);