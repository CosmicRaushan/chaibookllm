import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "chaibookllm" });

export type sourceCreatedEvent = {
    name: "source/created";
    data: {
        sourceId: string;
        workspaceId: string;
    };
};

export type sourceEvents = sourceCreatedEvent;


