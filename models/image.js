import mongoose from 'mongoose';

const { Schema } = mongoose;

export const imageSchema = new Schema(
  {
    publicId: {
      type: String,
      required: true,
      alias: 'public_id',
    },
    secureUrl: {
      type: String,
      alias: 'secure_url',
    },
    notes: String,
    metadata: {
      type: Map,
      of: String,
      alias: 'image_metadata',
    },
  },
  { timestamps: true }
);

export default mongoose.models.Image || mongoose.model('Image', imageSchema);
