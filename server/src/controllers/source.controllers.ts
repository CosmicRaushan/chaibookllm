import type { Request, Response } from "express";
import { workSpaceIdParamSchema } from "../validators/workspace.vlaidatores.ts";
import { getZodFieldErrors } from "../utils/zod-error.ts";
import { ValidationError } from "../types/app-error.ts";
import { bulkDeleteSourceSchema, createSourceSchema, importWebSearchSchema, importYoutubeSchema, listSourceQuerySchema, sourceIdParamsSchema, workspaceIdParamsSchema } from "../validators/source.vlaidators.ts";
import { bulkDeleteSourcesForWorkspace, createTextOrMarkdownSource, deleteSourceForWorkspace, getSourceForWorkspace, importWebsiteSource, importYoutubeSource, listSourceForWorkspace, uploadPdfSource } from "../services/source.services.ts";


function parseWorkspaceId(params: Request["params"]){
    const parsed = workSpaceIdParamSchema.safeParse(params);
    if(!parsed.success){
        throw new ValidationError("Invalid workspace Id", getZodFieldErrors(parsed.error))
    }
    return parsed.data;
};

function parseSourceParams(params: Request["params"]){
    const parsed = sourceIdParamsSchema.safeParse(params);

    if(!parsed.success){
        throw new ValidationError("Invlaid source Id", getZodFieldErrors(parsed.error));
    }
    return parsed.data;
};


function parseListQuery(query: Request["query"]) {
    const parsed = listSourceQuerySchema.safeParse(query);

    if(!parsed.success){
        throw new ValidationError("Invlaid query parameter", getZodFieldErrors(parsed.error));
    };
    return parsed.data;
};


function parseCreateBody(body: unknown){
    const parsed = createSourceSchema.safeParse(body);

    if(!parsed.success){
        throw new ValidationError("Validation failed", getZodFieldErrors(parsed.error));
    };
    return parsed.data;
}



export async function listSources(req: Request, res: Response) {
    const {workSpaceId} = parseWorkspaceId(req.params);
    const filters = parseListQuery(req.query);
    const source = await listSourceForWorkspace(
        workSpaceId,
        req.session.user.id,
        filters
    );
    res.json(source);
};


export async function createSource(req: Request, res: Response){
    const {workSpaceId} = parseWorkspaceId(req.params);
    const input = parseCreateBody(req.body);
    const source = await createTextOrMarkdownSource(
        workSpaceId,
        req.session.user.id,
        input,
    );
    res.status(201).json(source)
};

export async function bulkDeleteSources(req: Request, res: Response) {
    const {workSpaceId} = parseWorkspaceId(req.params);
    const input = bulkDeleteSourceSchema.parse(req.params);
    await bulkDeleteSourcesForWorkspace(
        workSpaceId,
        req.session.user.id,
        input.sourceId
    );
    res.status(204).send();
};

export async function getSource(req: Request, res: Response){
    const {workspaceId, sourceId} = sourceIdParamsSchema.parse(req.params);

    const source = await getSourceForWorkspace(
        workspaceId,
        sourceId,
        req.session.user.id,
    );
    res.json(source);
};

export async function deleteSources(req: Request, res: Response) {
    const {sourceId, workspaceId} = sourceIdParamsSchema.parse(req.params);
    await deleteSourceForWorkspace(
        workspaceId,
        sourceId,
        req.session.user.id
    );
    res.status(204).send();
};


export async function uploadPdf(req: Request, res: Response){
    const {workSpaceId} = workSpaceIdParamSchema.parse(req.params);

    if(!req.file){
        throw new ValidationError("Pdf file is required")
    };
    
    const title = typeof req.body.title === "string" ? req.body.title : undefined;

    const source = await uploadPdfSource(
        workSpaceId,
        req.session.user.id,
        req.file,
        title,
    );
    res.status(201).json(source);
};

export async function importWebsite(req: Request, res: Response){
    const {workSpaceId} = workSpaceIdParamSchema.parse(req.params);
    const input = importWebSearchSchema.parse(req.body)
    
    const source = await importWebsiteSource(
        workSpaceId,
        req.session.user.id,
        input,
    );
    res.status(201).json(source)
};


export async function importYoutube(req: Request, res: Response) {
    const { workSpaceId } = workSpaceIdParamSchema.parse(req.params);
    const input = importYoutubeSchema.parse(req.body);
    const source = await importYoutubeSource(
        workSpaceId,
        req.session.user.id,
        input,
    );
    res.status(201).json(source);
}