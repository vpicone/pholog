import mongoose from 'mongoose';
import { imageSchema } from './image';

const { Schema } = mongoose;

export const sessionSchema = new Schema(
  {
    title: {
      type: String,
      default: new Date().toLocaleDateString(),
    },
    notes: String,
    featuredImage: imageSchema,
    images: [imageSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Session ||
  mongoose.model('Session', sessionSchema);
