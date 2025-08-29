import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function PATCH(
    req: Request,
    {params}: {params: Promise<{ courseId: string, chapterId: string}>}
) {
    const { userId } = await auth()
    const { courseId, chapterId } = await params
    const { isCompleted } = await req.json()

    try {
        if ( !userId ) return new NextResponse("Acceso Denegado", { status : 401 });

        const chapter = await prisma.chapter.findUnique({
            where: {
                id: chapterId
            },
            select: {
                courseId: true
            }
        })

        if ( !chapter || chapter.courseId !== courseId ) {
            return new NextResponse("Capítulo no encontrado", { status: 404 });
        }

        const userProgress = await prisma.userProgress.upsert({
            where: {
                userId_chapterId: {
                    userId,
                    chapterId
                }
            },
            update: {
                isCompleted
            },
            create: {
                userId,
                chapterId,
                isCompleted
            }
        })

        return NextResponse.json(userProgress)

    } catch (error) {
        console.error('[COURSE_PROGRESS_UPDATE]: ', error)
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}