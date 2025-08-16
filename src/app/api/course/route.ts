import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth()
        const { courseName, slug } = await req.json()

        if ( !userId ) return new NextResponse("Acceso Denegado", { status: 401 });

        const course = await prisma.course.create({
            data: {
                userId,
                slug,
                title: courseName,
            }
        })

        return NextResponse.json(course)

    } catch (error) {
        console.log('[COURSE]: ', error)
        return new NextResponse("Internal Error Server", { status: 500 });
    }
}