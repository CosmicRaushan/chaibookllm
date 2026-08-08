import type { Express } from "express";
import { workspaceRoutes } from "./workspace.route.ts";


export function registerRoutes(app: Express): void {
    app.use("/api/workspaces", workspaceRoutes)
}