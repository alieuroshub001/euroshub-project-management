import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

interface UploadOptions {
  folder?: string;
  resource_type?: 'image' | 'video' | 'raw' | 'auto';
  transformation?: any[];
}

export async function uploadToCloudinary(
  file: string | Buffer,
  options: UploadOptions = {}
) {
  try {
    let uploadFile: string;
    if (Buffer.isBuffer(file)) {
      // Default to image/png if you don't know the mime type
      const base64 = file.toString('base64');
      uploadFile = `data:image/png;base64,${base64}`;
    } else {
      uploadFile = file;
    }
    const result = await cloudinary.uploader.upload(uploadFile, {
      folder: options.folder || 'project-management',
      resource_type: options.resource_type || 'auto',
      transformation: options.transformation,
    });
    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

export async function deleteFromCloudinary(publicId: string) {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
}

export function getCloudinaryUrl(publicId: string, options: any = {}) {
  return cloudinary.url(publicId, options);
}