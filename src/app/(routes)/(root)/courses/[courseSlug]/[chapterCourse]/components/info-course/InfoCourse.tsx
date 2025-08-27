import { Lock } from "lucide-react";

import { InfoCourseProps } from "./infoCourse.types";
import { VideoCourse } from "./video-course/VideoCourse";
import { ProgressCourse } from "./progress-course/ProgressCourse";

export function InfoCourse(props: InfoCourseProps) {

    const { infoCourse, chapterCourseId, userProgress, purchaseCourse, videoUrl } = props

    const { title, category, description } = infoCourse

    return (
        <div className=" w-full relative">
            {!purchaseCourse && (
                <div className=" absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md gap-y-2 h-full z-30 rounded-md text-secondary">
                    <p className=" text-sm text-red-600">
                        Capítulo bloqueado. Paga el curso para desbloquearlo
                        <Lock className=" w-8 h-8 text-red-600" />
                    </p>
                </div>
            )}

            <div className="mb-4 bg-white rounded-md p-6 shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                    <div className="px-2 py-1 bg-violet-400 text-white rounded-full text-xs shadow-md">
                        {category}
                    </div>
                </div>
                <p className="text-gray-600 text-sm">{description}</p>
            </div>


            <div className=" bg-white p-4 rounded-md shadow-lg">
                {videoUrl && (
                    <VideoCourse videoUrl={videoUrl} />
                )}

                <ProgressCourse
                    infoCourse={infoCourse}
                    userProgress={userProgress}
                    chapterCourseId={chapterCourseId}
                />
            </div>
        </div>
    )
}
