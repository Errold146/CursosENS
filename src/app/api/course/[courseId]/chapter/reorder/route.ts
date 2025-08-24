import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function PUT(
    req: Request,
    {params}: {params: {courseId: string}}
) {
    try {
        const { userId } = await auth()
        const { courseId } = await params
        const { list } = await req.json()

        if ( !userId ) return new NextResponse('Acceso Denegado', { status: 401 });

        const ownCourse = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId
            }
        })

        if ( !ownCourse ) return new NextResponse('Curso no encontrado', { status: 404 });

        for(const item of list) {
            await prisma.chapter.update({
                where: {
                    id: item.id
                },
                data: {
                    position: item.position
                }
            })
        }

        return new NextResponse('Success', { status: 200 });

    } catch (error) {
        console.error( '[COURSE_CHAPTER_REORDER]: ', error)
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}