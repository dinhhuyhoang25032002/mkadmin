import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";
export type DataBenefit = {
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

    // @Prop({ required: false })
    // benefit: Array<DataBenefit>;

    @Prop({ required: true })
    image: string;

    // @Prop({ required: true })
    // video: string;

    @Prop({ required: true })
    price: string;

    @Prop({ required: true })
    type: string;

    // @Prop({ required: true })
    // subType: string;

    // @Prop()
    // starNumber: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    users?: Array<ObjectId>;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }], required: true })
    // lessons?: Array<ObjectId>;

    // @Prop({ required: false })
    // references: string;
}

export const COURSE_MODEL = Course.name;
export const CourseSchema = SchemaFactory.createForClass(Course);