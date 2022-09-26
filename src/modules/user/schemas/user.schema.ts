import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  login: string;
  @Prop()
  id: string;
  @Prop()
  avatar_url: string;
  @Prop()
  url: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
