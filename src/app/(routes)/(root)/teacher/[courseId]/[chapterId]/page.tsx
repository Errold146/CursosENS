import { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { ChapterForm } from "./components";

export const metadata: Metadata = {
    title: 'Configuración Capítulo',
    description: 'Aqui es el lugar para la configuración de cada capitulo de cada curso'
}

export default async function ChapterPage(
    {params}: { params: Promise<{courseId: string, chapterId: string}>}
) {

    const { chapterId, courseId } = await params
    const { userId } = await auth()

    if ( !userId ) {
        return <p className="flex items-center justify-center text-2xl font-bold">Acceso Denegado</p>;
    }

    const chapter = await prisma.chapter.findUnique({
        where: {
            id: chapterId,
            courseId
        }
    })

    if ( !chapter ) return notFound();

    return (
        <div className="m-6">
            <ChapterForm chapter={chapter} courseId={courseId} />
        </div>
    )
}
