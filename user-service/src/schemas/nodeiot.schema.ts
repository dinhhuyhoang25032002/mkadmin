import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from 'mongoose'

@Schema({ timestamps: true })

export class NodeIoT extends Document {

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" })
    userId: ObjectId

    @Prop({ required: true })
    temperature: string

    @Prop({ required: true })
    humidy: string

    @Prop({ type: String, required: true })
    light: string
}

export const NODEIOT_MODEL = NodeIoT.name;
export const NodeIotSchema = SchemaFactory.createForClass(NodeIoT)
