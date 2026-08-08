import { Router } from "express";
import { createWorkspace, updateWorkspace, deleteWorkspace, getWorkspace, listWorkspaces } from "../controllers/worksapce.controller.ts";

import { requireAuth } from "../middleware/require-auth.middleware.ts";
import { asyncHandler } from "../utils/async-handler.ts";



export const workspaceRoutes = Router();

workspaceRoutes.use(requireAuth);

workspaceRoutes.get("/", asyncHandler(listWorkspaces));
workspaceRoutes.post("/", asyncHandler(createWorkspace));
workspaceRoutes.get("/:workspaceId", asyncHandler(getWorkspace))
workspaceRoutes.patch("/:workspaceId", asyncHandler(updateWorkspace));

workspaceRoutes.delete("/:workspaceId", asyncHandler(deleteWorkspace));