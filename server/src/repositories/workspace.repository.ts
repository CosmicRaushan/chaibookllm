import prisma from "../lib/db.ts";

import type { createWorkSpaceInput, updateWorkSpaceSchemaInput } from "../validators/workspace.vlaidatores.ts";

export const workSpaceSelect = {
    id: true,
    title: true,
    description: true,
    icon: true,
    defaultModel: true,
    createdAt: true,
    updatedAt: true,
} as const;


export type workSpaceRecord = {
    id: string,
    title: string,
    description: string | null,
    icon: string | null,
    defaultModel: string,
    createdAt: Date,
    updatedAt: Date,
}


export function findWorkspaceByUserId(userId: string) {
    return prisma.workspace.findMany({
        where: { userId },
        select: workSpaceSelect,
        orderBy: { updatedAt: "desc" }
    })
}


export function findWorkspaceByIdAnaUserId(workspaceId: string, userId: string) {
    return (
        prisma.workspace.findFirst({
            where: {
                id: workspaceId, userId
            },
            select: workSpaceSelect,
        })
    )
}

export function createWorkspaceRecord(
    userId: string,
    data: createWorkSpaceInput
) {
    return (
        prisma.workspace.create({
            data: {
                userId,
                ...data,
            },
            select: workSpaceSelect
        })
    )
}

export function updateWorkspaceRecord(workspaceId: string, data: updateWorkSpaceSchemaInput) {
    return (
        prisma.workspace.update({
            where: {
                id: workspaceId
            },
            data,
            select: workSpaceSelect
        })
    )
}

export async function deleteWorkspaceRecord(workspaceId: string) {
    await prisma.workspace.delete({
        where: {
            id: workspaceId
        },
    })
}