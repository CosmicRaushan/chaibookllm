import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.middleware.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { bulkDeleteSources, createSource, deleteSources, getSource, listSources } from "../controllers/source.controllers.ts";


export const sourceRoutes = Router({mergeParams: true});


sourceRoutes.get("/", asyncHandler(listSources));
sourceRoutes.post("/", asyncHandler(createSource));
sourceRoutes.post("/bulk-delete", asyncHandler(bulkDeleteSources));
sourceRoutes.get("/:sourceId", asyncHandler(getSource));
sourceRoutes.delete("/:sourceId", asyncHandler(deleteSources));
