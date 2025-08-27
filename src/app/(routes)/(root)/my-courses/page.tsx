import { ListCourses } from "@/components/shared"
import { getPurchasedMyCourses } from "@/actions/getPurchasedMyCourses"

export default async function MyCoursesPage() {

    const courses = await getPurchasedMyCourses()

    return (
        <div>
            <ListCourses title="Mis Cursos" courses={courses} />
        </div>
    )
}
