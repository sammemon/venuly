import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.warn('Cloudinary credentials not configured; file uploads will be disabled.');
}

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export default cloudinary;

export async function uploadImage(file: Buffer | string, options?: {
  folder?: string;
  public_id?: string;
  transformation?: any;
}): Promise<{ url: string; public_id: string } | null> {
  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('Cannot upload: Cloudinary not configured');
    return null;
  }

  try {
    const result = await cloudinary.uploader.upload(file as any, {
      folder: options?.folder || 'venuly',
      public_id: options?.public_id,
      transformation: options?.transformation,
      resource_type: 'auto',
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

export async function deleteImage(publicId: string): Promise<void> {
  if (!cloudName || !apiKey || !apiSecret) {
    console.warn('Cannot delete: Cloudinary not configured');
    return;
  }

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
}
