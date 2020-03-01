import mongoose from 'mongoose';
import { sessionSchema } from './session';

const { Schema } = mongoose;

export const userSchema = new Schema(
  {
    name: String,
    sessions: [sessionSchema],
    sub: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
