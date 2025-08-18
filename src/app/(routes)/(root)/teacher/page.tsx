import { currentUser } from "@clerk/nextjs/server"

import prisma from "@/lib/prisma"
import { Header, ListCourses } from "./components"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Listado de Cursos',
    description: 'Aqui encontraras listados todos los cursos existentes, del profesor con el respectivo id'
}

export default async function TeacherPage() {

    const user = await currentUser()
    if ( !user ) return;

    const courses = await prisma.course.findMany({ where: { userId: user.id } })

    return (
        <div>
            <Header />

            <ListCourses courses={courses} />
        </div>
    )
}
