import { Metadata } from 'next'
import { notFound } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

import prisma from "@/lib/prisma"
import { CourseForm, CourseImage, HeaderCourse, CoursePrice, ChaptersBlock } from "./components"

export const metadata: Metadata = {
    title: 'Página del Curso',
    description: 'En está página podreas editar y/o agregar información para el curso'
}

export default async function CoursePage({params}: { params: Promise<{ courseId: string }>}) {

    const { courseId } = await params
    const { userId } = await auth()
    if ( !userId ) return <p className=" text-red-600 font-semibold">Acceso denegado</p>;

    const course = await prisma.course.findUnique({
        where: {
            id: courseId,
            userId
        },
        include: {
            chapters: true
        }
    })

    if ( !course ) return notFound();

    return (
        <div className="m-6">
            <HeaderCourse idCourse={course.id} isPublished={course.isPublished} />

            <CourseForm course={course} />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4 items-stretch'>
                <CourseImage idCourse={course.id} imageCourse={course.imageUrl} />
                <CoursePrice idCourse={course.id} priceCourse={course.price} />
            </div>

            <ChaptersBlock chapters={course.chapters} idCourse={course.id} />
        </div>
    )
}
