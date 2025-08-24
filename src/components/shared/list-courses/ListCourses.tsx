import Link from "next/link";
import Image from "next/image";
import { Book, ChartNoAxesColumn } from "lucide-react";

import { IconBadge } from "../icon-badge/IconBadge";
import { ListCoursesProps } from "./listCourses.types";
import { ProgressCourse } from "../progress-course/ProgressCourse";

export function ListCourses(props: ListCoursesProps) {

    const { title, courses } = props

    return (
        <div className=" my-4 mx-6 border border-gray-200 rounded-md bg-white p-6">
            <h2 className=" text-2xl font-semibold">{title}</h2>
            <div className=" border-b-[1px] py-2 border-gray-300" />

            {courses && courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                    {courses.map(({id, imageUrl, title, level, price, slug, category, chapters}) => (
                        <Link 
                            key={id} 
                            href={`/courses/${slug}`}
                            className=" border border-gray-400 rounded-lg relative transition-shadow hover:shadow-lg shadow-violet-300 shadow-md"
                        >
                            <span 
                                className=" absolute top-2 right-2 z-10 px-2 py-1 bg-white text-violet-500 font-medium rounded-full text-xs shadow-md"
                            >
                                {category}
                            </span>
                            <div className=" w-full h-[180px] relative">
                                <Image 
                                    src={imageUrl || "/no.photo.png"}
                                    alt={title}
                                    fill
                                    className=" object-cover object-center rounded-t-lg"
                                    sizes="(max-width: 500px) 100vw, 1200px"
                                />
                            </div>
                            <div className="p-2">
                                <h3 className=" text-lg font-semibold text-gray-800 truncate">{title}</h3>

                                <div className="flex items-center gap-2 justify-between mt-2">
                                    <IconBadge text={`${chapters.length} Capítulos`} icon={Book} />
                                    <IconBadge text={level || ""} icon={ChartNoAxesColumn} />
                                </div>

                                <ProgressCourse 
                                    courseId={id} 
                                    totalChapters={chapters.length} 
                                    price={price}
                                />

                            </div>
                        </Link>
                    ))}
                </div>
            ): (
                <p className=" text-gray-600 text-center mt-4">
                    No hay cursos disponibles en este momento
                </p>
            )}
        </div>
    )
}
