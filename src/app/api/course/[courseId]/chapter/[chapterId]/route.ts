import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function PATCH(req: Request,
    {params}: {params: Promise<{courseId: string, chapterId: string}>}
) {
    try {
        const { userId } = await auth()
        const values = await req.json()
        const { courseId, chapterId } = await params

        if ( !userId ) return new NextResponse('Acceso Denegado', { status: 401 });

        const course = await prisma.chapter.update({
            where: {
                id: chapterId,
                courseId
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(course)

    } catch (error) {
        console.log('[COURSE_CHAPTER_UPDATE]: ', error)
        return new NextResponse('Internal Sever Error', { status: 500 });
    }
}

export async function DELETE(req: Request,
    {params}: {params: Promise<{courseId: string, chapterId: string}>}
) {
    try {
        const { userId } = await auth()
        const { courseId, chapterId } = await params

        if ( !userId ) return new NextResponse('Acceso Denegado', { status: 401 });

        const chapter = await prisma.chapter.delete({
            where: {
                id: chapterId,
                courseId
            }
        })

        return NextResponse.json(chapter)

    } catch (error) {
        console.log('[COURSE_CHAPTER_DELETE]: ', error)
        return new NextResponse('Internal Sever Error', { status: 500 });
    }
}