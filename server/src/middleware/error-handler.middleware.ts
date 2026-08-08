import type { NextFunction, Request, Response} from "express";

import multer from "multer"
import {ZodError} from "zod"
import { AppErro } from "../types/app-error.ts";
import { getZodFieldErrors } from "../utils/zod-error.ts";

export function errorHandler (
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    if(error instanceof AppErro){
        res.status(error.statusCode).json({
            error: error.message,
            ...(error.details ? {details: error.details} : {}),
        });
        return;
    }

    if(error instanceof ZodError) {
        res.status(400).json({
            error: "vlaidation failed",
            details: getZodFieldErrors(error),
        });
        return;
    }

    if(error instanceof multer.MulterError){
        res.status(400).json({
            error: error.message
        })
        return;
    }

    if(error instanceof Error && error.message === "Only pdf files are allowed "){
        res.status(400).json({
            error: error.message
        })
        return;
    }

    const cloudinaryError = error as Error & {http_code?: number, name?: string};
    if(cloudinaryError.name === "UnexpectedResponse" && cloudinaryError.http_code === 403){
        res.status(400).json({
            error: "Cloudinary upload rejectd. Your API is missing uploa(Create) permission"
        });
        return;
    }

    console.error(error)
    res.status(400).json({error: "Internal Server Error."});     
}