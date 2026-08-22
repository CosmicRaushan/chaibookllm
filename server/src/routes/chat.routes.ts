import { Router } from "express";
import { requireAuth } from "../middleware/require-auth.middleware.ts";
import { asyncHandler } from "../utils/async-handler.ts";
import { createConversation, deleteConversation, listConversationMessages, listConvesations, streamChat } from "../controllers/chat.controller.ts";

export const conversationRoutes = Router({ mergeParams: true });

conversationRoutes.use(requireAuth);

conversationRoutes.get("/", asyncHandler(listConvesations));
conversationRoutes.post("/", asyncHandler(createConversation));
conversationRoutes.get("/:conversationId/messages", asyncHandler(listConversationMessages));
conversationRoutes.delete("/:conversationId", asyncHandler(deleteConversation));


export const chatRoutes = Router({ mergeParams: true });
chatRoutes.post("/", asyncHandler(streamChat));