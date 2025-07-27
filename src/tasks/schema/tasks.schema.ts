import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";



@Schema()
export class Task extends Document {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop()
  time: Date
  @Prop({
    type: Types.ObjectId,
    ref: "User"
  })
  task_owner: Types.ObjectId
}

export const taskSchema = SchemaFactory.createForClass(Task);