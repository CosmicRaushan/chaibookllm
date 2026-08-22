import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.middleware.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { createMemory, deleteMemory, listMemories, updateMemory } from "../controllers/memory.contollers.ts";

export const memoryRoutes = Router();

memoryRoutes.use(requireAuth);

memoryRoutes.get("/", asyncHandler(listMemories));
memoryRoutes.post("/", asyncHandler(createMemory));
memoryRoutes.patch("/:memoryId", asyncHandler(updateMemory));
memoryRoutes.delete("/:memoryId", asyncHandler(deleteMemory));