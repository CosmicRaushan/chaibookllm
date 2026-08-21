import { inngest } from "../inngest/client.ts";

export async function enqueueSourceProcessing(input: {
    sourceId: string,
    workspaceId: string
}) {
    await inngest.send({
        name: "source/created",
        data: input
    })
}