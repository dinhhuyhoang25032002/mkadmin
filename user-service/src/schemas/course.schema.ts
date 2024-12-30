import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
export type dataBenefit = {
    image?: string;
    description?: string;
};
@Schema({ timestamps: true })
export class Course extends Document {

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, unique: true  })
    slug: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    price: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    users?: Array<ObjectId>;

}

export const COURSE_MODEL = Course.name;
export const CourseSchema = SchemaFactory.createForClass(Course);