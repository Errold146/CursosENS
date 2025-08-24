import { CourseContentProps } from "./courseContent.types";

export function CourseContent(props: CourseContentProps) {

    const { chapters } = props

    return (
        <div>
            <h2 className=" text-3xl font-semibold mb-4 pb-4">Contenido del curso</h2>

            <div className=" space-y-6">
                {chapters.map((chap, index) => (
                    <div 
                        key={chap.id}
                        className="flex items-start space-x-4 p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all"
                    >
                        <div 
                            className=" flex-shrink-0 bg-violet-400 text-white font-semibold rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            {index + 1}
                        </div>

                        <div className=" flex-1">
                            <h4 className=" text-xl font-medium text-gray-800">{chap.title}</h4>
                        </div>

                        <div className="flex-shrink-0 flex items-center justify-center">
                            <span
                                className={` px-2 py-1 text-xs rounded-full font-medium mt-1
                                    ${chap.isPublished
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-red-100 text-red-800"
                                    }
                                `}
                            >
                                {chap.isPublished ? 'Publicado' : 'Sin Publicar'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
