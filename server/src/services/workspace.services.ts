import { allowedNodeEnvironmentFlags } from "node:process";
import {
    findWorkspaceByUserId,
    findWorkspaceByIdAnaUserId,
    updateWorkspaceRecord,
    createWorkspaceRecord,
    deleteWorkspaceRecord,
    type workSpaceRecord
} from "../repositories/workspace.repository.ts";
import { NotFoundError } from "../types/app-error.ts";
import type { createWorkSpaceInput, updateWorkSpaceSchemaInput } from "../validators/workspace.vlaidatores.ts";

export function listWorkspaceByUser(userId: string) {
    return findWorkspaceByUserId(userId)
}

export async function getWorkspaceByIdForUser(workspaceId: string,
    userId: string
): Promise<workSpaceRecord> {
    const workspace = await findWorkspaceByIdAnaUserId(workspaceId, userId)

    if (!workspace) {
        throw new NotFoundError("Workspace not found")
    }
    return workspace
}


export function createWorkspaceForUser(userId: string, input: createWorkSpaceInput) {
    return createWorkspaceRecord(userId, input)
}

export async function updateWorkspaceForUser(
    workspaceId: string,
    userId: string,
    input: updateWorkSpaceSchemaInput
) {
    await getWorkspaceByIdForUser(workspaceId, userId)
    return updateWorkspaceRecord(workspaceId, input)
}

export async function deleteWorkSapceForUser(workspaceId: string, userId: string) {
    await getWorkspaceByIdForUser(workspaceId, userId)
    await deleteWorkspaceRecord(workspaceId)
}