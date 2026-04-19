import { Schema, model, Document, models } from "mongoose";

export interface IUrl extends Document {
  to_shortened: string;
  shortened: string;
  createdAt: Date;
}

const UrlSchema = new Schema<IUrl>({
    to_shortened: {
        type: String,
        required: true,
        trim: true,
        min: 3,
    },
    shortened: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: {createdAt: true}})

const UrlModel = models.urlmodel || model('urlmodel', UrlSchema)

export default UrlModel;