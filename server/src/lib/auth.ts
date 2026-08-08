import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.ts";

const clientURL = process.env.BETTER_AUTH_URL || `http://localhost:3000`

export const auth = betterAuth({
    baseUrl: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [clientURL],
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    }
})

