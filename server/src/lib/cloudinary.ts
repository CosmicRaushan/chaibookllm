import { v2 as cloudinary } from 'cloudinary';
import { ValidationError } from '../types/app-error.ts';

const cloudeName = process.env.CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.CLOUDINARY_CLOUD_PRESET ?? "djdvmzvnt";
const apikey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

export type CloudinaryUploadResult = {
    secureUrl: string,
    publicId: string,
    bytes: number,
    originalFileName: string,
    resourceType: "raw" | "image",
};

export type CloudinaryUploadResponse = {
    secur_url: string,
    public_id: string,
    bytes: number,
    resource_type?: string,
    error?: { message: string },
};

export function getSignedCloudinaryDownloadUrl(
    publicId: string,
    resourceType: "raw" | "image" = "raw"
) {
    if (!cloudeName || !apikey || !apiSecret) {
        return null;
    };

    cloudinary.config({
        cloud_name: cloudeName,
        api_key: apikey,
        api_secret: apiSecret,
        secure: true
    });

    return cloudinary.url(publicId, {
        resource_type: resourceType,
        type: "upload",
        sign_url: true,
        secure: true
    });
};

export async function uploadPdfToCloudinary(
    buffer: Buffer,
    fielname: string
): Promise<CloudinaryUploadResult> {
    if (!cloudeName) {
        throw new ValidationError("Cloudinary is not configures on the server");
    };

    const form = new FormData();
    form.append("file", new Blob([new Uint8Array(buffer)], { type: "application/pdf" }), fielname);
    form.append("upload_preset", uploadPreset);
    form.append("folder", "Granthah/pdfs");
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudeName}/raw/upload`,
        {
            method: "POST",
            body: form
        },
    );

    const result = (await response.json()) as CloudinaryUploadResponse;

    if (!response.ok) {
        const message = result.error?.message ?? `Cloudinary upload failed(${response.status})`

        if (response.status === 403) {
            throw new ValidationError("Cloudinary rejected the upload. Check CLOUDINARY_UPLOAD_PRESET in server/.env matches an unsigned preset in your dashboard.",
            )
        }

        throw new ValidationError(message);
    }

    return {
        secureUrl: result.secur_url,
        publicId: result.public_id,
        bytes: result.bytes,
        originalFileName: fielname,
        resourceType: result.resource_type === "image" ? "image" : "raw",
    };
}