import { inngest } from "../inngest/client.ts";

export async function enqueueArtifactGeneration(
    input: {
        artifactId: string;
        workspaceId: string;
    }
){
    await inngest.send({
        name: "artifact/generate",
        data: input,
    })
}