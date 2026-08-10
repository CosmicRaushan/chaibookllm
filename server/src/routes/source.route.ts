import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.middleware.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { bulkDeleteSources, createSource, deleteSources, getSource, importWebsite, listSources, uploadPdf } from "../controllers/source.controllers.ts";
import { uploadSinglePdf } from "../middleware/upload.middleware.ts";


export const sourceRoutes = Router({mergeParams: true});

sourceRoutes.post("/upload", uploadSinglePdf, asyncHandler(uploadPdf))

sourceRoutes.post("/import/website", asyncHandler(importWebsite));
sourceRoutes.get("/", asyncHandler(listSources));
sourceRoutes.post("/", asyncHandler(createSource));
sourceRoutes.post("/bulk-delete", asyncHandler(bulkDeleteSources));
sourceRoutes.get("/:sourceId", asyncHandler(getSource));
sourceRoutes.delete("/:sourceId", asyncHandler(deleteSources));
