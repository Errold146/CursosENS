import { ExploreCourses } from "./components";
import { ListCourses } from "@/components/shared";
import { getHomeCourses } from "@/actions/getHomeCourses";

export default async function Home() {

    const listCourses = await getHomeCourses()

    return (
        <div className="">
            <ExploreCourses />

            <ListCourses title="Los cursos más vendidos" courses={listCourses} />
        </div>
    )
}
