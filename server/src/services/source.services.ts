import { userInfo } from "node:os";
import { createSourceRecord, deleteSourceRecord, findSourceByIdAndWorkspaceId, findSourcesByworkspaceId, type SourceRecord } from "../repositories/source.repository.ts";
import type { BulkDeleteSourceInput, CreateSourceInput, ImportWebsiteInput, ListSourceQuery } from "../validators/source.vlaidators.ts"
import { getWorkspaceByIdForUser } from "./workspace.services.ts"
import { NotFoundError } from "../types/app-error.ts";
import { removeSourceFromIndex } from "./source-processing.services.ts";
import { scrapeWebsite } from "../lib/firecrawl.ts";
import { uploadPdfToCloudinary } from "../lib/cloudinary.ts";
import { extractPdfFromBuffer } from "../lib/pdf.ts";


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
};


export async function createAndProcessSource(
    data: Parameters<typeof createSourceRecord>[0],
){
    const source = await createSourceRecord(data);

    // await enqueueSourceProcessing({
    //     sourceId: source.id,
    //     workspaceId: source.workspaceId
    // });
    return source;
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
    };
};



export async function importWebsiteSource(
    workspaceId: string,
    userId: string,
    input: ImportWebsiteInput
){
    await getWorkspaceByIdForUser(workspaceId, userId);
    const scraped = await scrapeWebsite(input.url)

    return createAndProcessSource({
        workspaceId,
        type: "WEBSITE",
        title: input.title || scraped.title || input.url,
        content: scraped.markdown,
        url: scraped.sourceUrl,
        status: "PENDING",
        metadata: {
            importedFrom: scraped.sourceUrl,
        },
    })
};


export async function uploadPdfSource(
    workspaceId: string,
    userId: string,
    file: Express.Multer.File,
    title?: string,
) {
   await getWorkspaceByIdForUser(workspaceId, userId);
   const upload = await uploadPdfToCloudinary(
    file.buffer,
    file.originalname
   );

   let content: string | null = null;
   let pageCount: number | undefined;

   try {
        const extracted =  await extractPdfFromBuffer(file.buffer);
        content = extracted.text;
        pageCount = extracted.pageCount;
   } catch (error) {
        console.error(error)
   }

   return createAndProcessSource({
    workspaceId,
    type: "PDF",
    title: title?.trim() || file.originalname.replace(/\.pdf/i, ""),
    content,
    status: "PENDING", 
    metadata: {
        fileUrl: upload.secureUrl,
        fileName: upload.originalFileName,
        fileSize: upload.bytes,
        publicId: upload.publicId,
        resourceType: upload.resourceType,
        pageCount
    },
   });
};