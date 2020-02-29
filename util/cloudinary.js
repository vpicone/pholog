import { v2 as cloudinary } from 'cloudinary';
import config from './config';

const { promisify } = require('util');

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const upload = promisify(cloudinary.uploader.upload);
export const subFolders = promisify(cloudinary.api.sub_folders);
