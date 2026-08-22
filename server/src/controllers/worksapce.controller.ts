import type { Request, Response } from "express";
import {
    createWorkspaceForUser,
    deleteWorkSapceForUser,
    getWorkspaceByIdForUser,
    listWorkspaceByUser,
    updateWorkspaceForUser
} from "../services/workspace.services.ts";

import { ValidationError } from "../types/app-error.ts";
import { createWorkspaceSchema, updateWorkSpaceSchema, workspaceIdParamSchema } from "../validators/workspace.vlaidatores.ts";
import { getZodFieldErrors } from "../utils/zod-error.ts";

function parseWorkspaceId(params: Request['params']) {
    const parsed = workspaceIdParamSchema.safeParse(params);

    if (!parsed.success) {
        throw new ValidationError("Invalid workspace id", getZodFieldErrors(parsed.error))
    }
    return parsed.data;
}

function parseCreateBody(body: unknown) {
    const parsed = createWorkspaceSchema.safeParse(body);

    if (!parsed.success) {
        throw new ValidationError("Validation failed",
            getZodFieldErrors(parsed.error)
        )
    }
    return parsed.data;
}

function parseUpdateBody(body: unknown) {
    const parsed = updateWorkSpaceSchema.safeParse(body);

    if (!parsed.success) {
        throw new ValidationError("Validation failed", getZodFieldErrors(parsed.error))
    }
    return parsed.data;
}

export async function listWorkspaces(req: Request, res: Response) {
    const workspaces = await listWorkspaceByUser(req.session.user.id)
    res.json(workspaces)
}

export async function getWorkspace(req: Request, res: Response) {
    const { workSpaceId } = parseWorkspaceId(req.params);
    const workspace = await getWorkspaceByIdForUser(workSpaceId, req.session.user.id)
    res.json(workspace)
}

export async function createWorkspace(req: Request, res: Response) {
    const input = parseCreateBody(req.body)
    const workspace = await createWorkspaceForUser(req.session.user.id, input)
    res.status(201).json(workspace);
}

export async function updateWorkspace(req: Request, res: Response) {
    const { workSpaceId } = parseWorkspaceId(req.params)
    const input = parseUpdateBody(req.body);
    const workspace = await updateWorkspaceForUser(workSpaceId, req.session.user.id, input)
    res.json(workspace);
}

export async function deleteWorkspace(req: Request, res: Response) {
    const { workSpaceId } = parseWorkspaceId(req.params)
    await deleteWorkSapceForUser(workSpaceId, req.session.user.id)
    res.status(204).send()
}