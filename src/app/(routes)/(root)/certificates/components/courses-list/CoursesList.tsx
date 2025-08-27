import Image from "next/image";
import { CoursesListProps } from "./coursesList.types";
import { CourseListDisplay } from "../course-progress-display/CourseProgressDisplay";

export function CoursesList(props: CoursesListProps) {

    const { courses, userName } = props

    return (
        <div className=" grid grid-cols-1 gap-5">
            {courses.map(cour => (
                <div
                    key={cour.id}
                    className="border border-gray-300 p-4 rounded-md flex gap-4 justify-between shadow-sm"
                >
                    <div className=" flex gap-4">
                        <div>
                            <Image 
                                src={cour.imageUrl || "/no-photo.png"}
                                alt={cour.title}
                                width={100}
                                height={100}
                                priority
                                className=" rounded-md"
                            />
                        </div>

                        <div className="flex flex-col">
                            <h2 className=" text-xl font-semibold">{cour.title}</h2>
                            <p className=" max-w-sm text-gray-600 text-xs line-clamp-2">{cour.description}</p>
                        </div>
                    </div>
                    
                    <div>
                        <CourseListDisplay 
                            progress={cour.progress} 
                            titleCourse={cour.title}    
                            userName={userName}
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}
