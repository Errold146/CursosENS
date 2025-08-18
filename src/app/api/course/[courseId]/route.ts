import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function PATCH(req: Request,
    {params}: {params: Promise<{courseId: string}>}
) {
    try {
        const { userId } = await auth()
        const { courseId } = await params
        const body = await req.json()

        if ( !userId ) return new NextResponse('Acceso Denegado', { status: 401 });

        const course = await prisma.course.update({
            where: {
                id: courseId,
                userId
            },
            data: body
        })

        return NextResponse.json(course)

    } catch (error) {
        console.log('[Course]: ', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

export async function DELETE(req: Request,
    {params}: {params: Promise<{courseId: string}>}
) {
    try {
        const { userId } = await auth()
        if ( !userId ) return new NextResponse('Acceso Denegado', { status: 401 });

        const { courseId } = await params
        const course = await prisma.course.delete({
            where: {
                id: courseId,
                userId
            }
        })

        return NextResponse.json(course)

    } catch (error) {
        console.log('[Course]: ', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}