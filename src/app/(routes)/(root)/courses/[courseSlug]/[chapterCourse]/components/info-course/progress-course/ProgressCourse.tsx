"use client"

import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SquareCheckBig , SquareX  } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProgressCourseProps } from "./progressCourse.types";

export function ProgressCourse(props: ProgressCourseProps) {

    const router = useRouter()

    const { userProgress, chapterCourseId, infoCourse } = props
    const { id, slug, chapters } = infoCourse
    const [isCompleted, setIsCompleted] = useState(false)

    useEffect(() => {
        const progress = userProgress.find(pro => pro.chapterId === chapterCourseId)
        if ( progress ) setIsCompleted(progress.isCompleted);

    }, [chapterCourseId, userProgress])

    const handleViewChapters = async (isCompleted: boolean) => {
        try {
            await axios.patch(`/api/course/${id}/chapter/${chapterCourseId}/progress`,
                JSON.stringify({isCompleted})
            )

            toast.success(isCompleted ? 'Capítulo Completado Correctamente' : 'Capítulo No Completado')

            if ( isCompleted ) {
                
                const currentIndex = chapters.findIndex(chap => chap.id === chapterCourseId)
                const nextChapter = chapters[currentIndex + 1]

                if ( nextChapter ) {
                    router.push(`/courses/${slug}/${nextChapter.id}`)
                }
            }

            router.refresh()

        } catch {
            toast.error('Ocurrio un error, recargue e intente de nuevo')
        }
    }

    const totalChapters = chapters.length
    const completedChapters = chapters.filter(chap => userProgress.some( 
        pro => pro.chapterId === chap.id && pro.isCompleted
    )).length

    const progressPercentage = 
        totalChapters > 0
            ? Math.round((completedChapters / totalChapters) * 100)
            : 0

    return (
        <div>
            <div className=" w-full flex items-center gap-2 flex-col p-2">
                <span className=" text-sm my-4">Progreso del curso | {progressPercentage}%</span>
                <Progress value={progressPercentage} className="[&>*]:bg-violet-500" />
                <div className=" my-4 w-full">
                    <Button
                        className={`w-full md:w-fit transition-colors cursor-pointer flex items-center gap-2 
                            ${isCompleted ? "bg-violet-500 hover:bg-violet-400" : "bg-emerald-500 hover:bg-emerald-400"}`}
                        onClick={() => handleViewChapters(!isCompleted)}
                    >
                        {isCompleted ? (
                            <SquareX  className="w-5 h-5" />
                        ) : (
                            <SquareCheckBig  className="w-5 h-5" />
                        )}
                        {isCompleted ? "Marcar No Visto" : "Marcar Visto"}
                    </Button>
                </div>
            </div>
        </div>

    )
}
