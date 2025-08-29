import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ courseId: string }> }
) {
    try {
        const { userId } = await auth();
        const { courseId } = await params;
        const { title } = await req.json();

        if (!userId) return new NextResponse("Acceso Denegado", { status: 401 });

        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                userId,
            },
        });

        if (!course) return notFound();

        const chapterCount = await prisma.chapter.count({ where: { courseId } });

        const chapter = await prisma.chapter.create({
            data: {
                title,
                courseId,
                position: chapterCount + 1,
            },
        });

        return NextResponse.json(chapter); // ✅ devuelve el objeto completo
    } catch (error) {
        console.log("[COURSE_CHAPTER]: ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}