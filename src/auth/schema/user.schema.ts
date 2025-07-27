import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop()
  fullName: string;
  @Prop({
    required: true,
    unique: true
  })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop(
    {
      type:[Types.ObjectId],
      ref:"Task",
      default:[]
    }
  )
  tasks:Types.ObjectId[]
}

export const UserSchema = SchemaFactory.createForClass(User);