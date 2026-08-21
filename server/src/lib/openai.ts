import OpenAI from "openai";

import { CHAT_MODEL, EMBEDDING_DIMENSIONS, EMBEDDING_MODEL } from "./ai-config.ts";
import { number } from "zod";


export {CHAT_MODEL, EMBEDDING_DIMENSIONS, EMBEDDING_MODEL};

let client:OpenAI |null  = null;


export async function embedTexts(text: string[]): Promise<number[][]>{
    if(text.length === 0){
        return[];
    };

    if(!process.env.OPENAI_API_KEY){
        throw new Error("OpenAI api key not configured");
    };

    if(!client){
        client = new OpenAI({apiKey: process.env.OPENAI_API_KEY})
    };

    const response = await client.embeddings.create({
        model: EMBEDDING_MODEL,
        input: text,
        dimensions: EMBEDDING_DIMENSIONS
    });

    return response.data.sort((a,b) => a.index - b.index).map((item) => item.embedding);
}