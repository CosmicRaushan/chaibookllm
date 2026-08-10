import { extractText, getDocumentProxy } from 'unpdf';
import { getSignedCloudinaryDownloadUrl } from './cloudinary.ts';

export type PdfExtractResult = {
    text: string,
    pages: string[],
    pageCount: number
};


export async function downloadPdf(url: string){
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Failed to download pdf (${response.status})`);
    }

    return response.arrayBuffer();
}


export async function extractPdfFromCloudinary(input: {
    fileUrl: string,
    publishId?: string,
    resourceType?: "raw" | "image"
}): Promise<PdfExtractResult> {
    try {
        const buffer = await downloadPdf(input.fileUrl);
        return await extractPdfFromBuffer(buffer);
    } catch (error) {
        const isUnauthorized = error instanceof Error && error.message.includes("401");
        if (!isUnauthorized || !input.publishId) {
            throw error
        };

        const signedUrl = getSignedCloudinaryDownloadUrl(
            input.publishId,
            input.resourceType ?? "raw"
        );

        if (!signedUrl) {
            throw new Error("PDF download requires authentication. Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to server/.env, or re-upload the PDF.",
            )
        };

        const buffer = await downloadPdf(signedUrl);
        return extractPdfFromBuffer(buffer)
    }
}





export async function extractPdfFromBuffer(
    buffer: ArrayBuffer | Buffer,
): Promise<PdfExtractResult> {
    const arrayBuffer = buffer instanceof Buffer ? (
        buffer.buffer.slice(
            buffer.byteOffset,
            buffer.byteOffset + buffer.byteLength
        ) as ArrayBuffer
    ) : buffer

    const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));

    const { totalPages, text } = await extractText(pdf, { mergePages: false });

    const pages = Array.isArray(text)
        ? text.map((page) => page.trim())
        : [String(text).trim()];

    const joined = pages.filter(Boolean).join("\n\n");
    if (!joined) {
        throw new Error("No text could be extracted from the pdf")
    };
    return {
        text: joined,
        pages,
        pageCount: totalPages
    };
}