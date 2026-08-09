import type { Express } from "express";
import { workspaceRoutes } from "./workspace.route.ts";
import { sourceRoutes } from "./source.route.ts";


export function registerRoutes(app: Express): void {
    workspaceRoutes.use("/:workspaceId/sources", sourceRoutes)
    app.use("/api/workspaces", workspaceRoutes)
}

