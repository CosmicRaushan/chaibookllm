import { userInfo } from "node:os";
import { deleteSourceRecord, findSourceByIdAndWorkspaceId, findSourcesByworkspaceId, type SourceRecord } from "../repositories/source.repository.ts";
import type { BulkDeleteSourceInput, CreateSourceInput, ListSourceQuery } from "../validators/source.vlaidators.ts"
import { getWorkspaceByIdForUser } from "./workspace.services.ts"
import { NotFoundError } from "../types/app-error.ts";
import { removeSourceFromIndex } from "./source-processing.services.ts";


async function assertWorkspaceAccess(worksapceId: string, userId: string) {
    await getWorkspaceByIdForUser(worksapceId, userId)
};

export async function getSourceForWorkspace(
    workspaceId: string,
    sourceId: string,
    userId: string
): Promise<SourceRecord>{
    await getWorkspaceByIdForUser(workspaceId, userId);
    const source =  await findSourceByIdAndWorkspaceId(sourceId, workspaceId);
    if(!source){
        throw new NotFoundError("Source not found")
    };
    return source;
};




export async function deleteSourceForWorkspace(
    workspaceId: string,
    sourceId: string,
    userId: string
){
    await getSourceForWorkspace(workspaceId, sourceId, userId);
    await removeSourceFromIndex(workspaceId, sourceId);
    await deleteSourceRecord(sourceId)
}

export async function listSourceForWorkspace(
    workspaceId: string,
    userId: string,
    filter: ListSourceQuery = {}
) {
    await assertWorkspaceAccess(workspaceId, userId);
    return findSourcesByworkspaceId(workspaceId, filter)
}

export async function createTextOrMarkdownSource(
    workspaceId: string,
    userId: string,
    input: CreateSourceInput,
) {
    await assertWorkspaceAccess(workspaceId, userId);
    // return createAndProcessSource({
    //     workspaceId,
    //     type: input.type,
    //     title: input.title,
    //     content: input.content,
    //     status: "PENDING"
    // })
}


export async function bulkDeleteSourcesForWorkspace(
    workspaceId: string,
    userId: string,
    sourceIds: string[]
){
    await getWorkspaceByIdForUser(workspaceId, userId);
    for(const sourceId of sourceIds){
        await deleteSourceForWorkspace(workspaceId, sourceId, userId)
    }
}