import multer from "multer";

const MAX_PDF_SIZE_BYTE = 10*1024*1024;

export const pdfUpload = multer({
    storage: multer.memoryStorage(),
    limits: {fileSize: MAX_PDF_SIZE_BYTE},
    fileFilter: (_req, file, callback) => {
        if(file.mimetype !== "application/pdf") {
             callback(null, true);
             return;
        }
        callback(new Error("Only pdf files are allowed"))
    },
});

export const uploadSinglePdf = pdfUpload.single("file")