import { Book } from "lucide-react";
import { CourseCard } from "../course-card/CourseCard";
import { ListCoursesProps } from "./listCourse.types";

export function ListCourses(props: ListCoursesProps) {

    const { courses } = props
    if ( courses.length === 0 ) {
        return <p 
            className="flex flex-col h-screen items-center justify-center text-3xl text-center font-semibold"
        >
            No hay cursos creados <Book className=" w-14 h-14" />
        </p>;
    }

    return (
        <div className="flex flex-col my-4 mx-6 border border-gray-300 rounded-lg bg-white p-4 gap-10">
            {courses.map( course => (
                <div key={course.id}>
                    <CourseCard course={course} />
                    <div className="border-t border-gray-200 w-full mt-4" />
                </div>
            ))}
        </div>
    )
}
