import { Award } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server"

import { CoursesList, Warning } from "./components";
import { getPurchasedMyCourses } from "@/actions/getPurchasedMyCourses"
import { getUserProgressByCourses } from "@/actions/getUserProgressByCourses";

export default async function CertificatesPage() {

    const courses = await getPurchasedMyCourses()
    const user = await currentUser()

    if ( !user ) return <p>Inicia Sesión</p>;
    if ( !courses ) return null;

    const userName = `${user.firstName} ${user.lastName ? user.lastName : ''}`

    const coursesWithProgress = await Promise.all(
        courses.map( async cour => {
            const progress = await getUserProgressByCourses(user.id, cour.id)
            return { ...cour, progress }
        })
    )

    return (
        <div className=" m-6 p-6 border border-gray-200 bg-white rounded-md shadow-md">
            <div className=" flex items-center gap-1 mb-4">
                <div className=" p-2 rounded-full bg-violet-400">
                    <Award className=" w-5 h-5 text-white" />
                </div>
                <h3 className=" text-xl font-semibold ml-2">Certificados de los Cursos</h3>
            </div>

            <CoursesList courses={coursesWithProgress} userName={userName} />

            <Warning />
        </div>
    )
}
