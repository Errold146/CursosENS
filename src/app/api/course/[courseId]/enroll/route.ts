import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: { courseId: string } }
) {
    const { userId } = await auth()
    const { courseId } = await params

    if ( !userId ) return new NextResponse('Acceso Denegado', { status: 401 });

    try {
        const existingPurchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        })

        if ( existingPurchase ) return new NextResponse("Curso comprado anteriormente", { status: 400 });

        await prisma.purchase.create({
            data: {
                userId,
                courseId,
                price: "0"
            }
        })

        return new NextResponse("Curso comprado correctamente", { status: 200 });

    } catch (error) {
        console.error("[COURSE_ENROLL_ERROR]:", error);
        return new NextResponse('Error interno al guardar la compra', { status: 500 });
    }
}