import { Metadata } from "next"

import { ListCourses } from "@/components/shared"
import { getHomeCourses } from "@/actions/getHomeCourses"

export const metadata: Metadata = {
    title: "Todos los Cursos",
    description: "Aqui encontraras todos los cursos listados."
}

export default async function CoursesPage() {

    const listCourses = await getHomeCourses()

    return (
        <div>
            <ListCourses title="Todos los Cursos" courses={listCourses} />
        </div>
    )
}
