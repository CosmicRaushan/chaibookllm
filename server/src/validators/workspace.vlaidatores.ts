import z, { object } from "zod";

export const CHAT_MODELS = ["gpt-4o-mini", "gpt-4o"] as const


export const createWorkspaceSchema = z.object({
    title: z.string().trim().min(1, "Title is requeired").max(150),
    icon: z.string().trim().max(8).optional(),
    description: z.string().max(500).optional(),
    defaultModel: z.enum(CHAT_MODELS).optional(),
})


export const updateWorkSpaceSchema = createWorkspaceSchema
    .partial()
    .refine(
        (data) => Object.keys(data).length > 0,
        { message: "At least One field is require" }
    )


export type createWorkSpaceInput = z
    .infer<typeof createWorkspaceSchema>
export type updateWorkSpaceSchemaInput = z
    .infer<typeof updateWorkSpaceSchema>


export const workSpaceIdParamSchema = z.object({
    workSpaceId: z.string().trim().min(1),
}) 