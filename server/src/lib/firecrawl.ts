import { Firecrawl } from 'firecrawl';
import { ValidationError } from '../types/app-error.ts';

export async function scrapeWebsite(url: string){
    const apiKey = process.env.FRIRECRAWL_API_KEY;

    if(!apiKey){
        throw new ValidationError("Firecrawl is not configured on the server.");
    };

    const client = new Firecrawl({apiKey});
    const result = await client.scrape(url, {
        formats: ["markdown"]
    });

    const markdown = result.markdown?.trim();
    if(!markdown){
        throw new ValidationError("Could extract content from this url.");
    };
    
    return {
        markdown,
        title: result.metadata?.title,
        sourceUrl: result.metadata?.sourceURL ?? url
    }
}