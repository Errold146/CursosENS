"use client"

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ArrowLeft, Cog, Eye, EyeOff, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TitleBlock } from "../../../components";
import { ChapterFormProps } from "./chapterForm.types";
import { ChapterTitleForm } from "./chapter-title-form/ChapterTitleForm";
import { ChapterVideoForm } from "./chapter-video-form/ChapterVideoForm";

export function ChapterForm(props: ChapterFormProps) {

    const router = useRouter()
    const { chapter, courseId } = props

    if ( !chapter ) return null;

    const onPublish = async (state: boolean) => {
        try {
            await axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
                isPublished: state
            })

            toast.success(state ? 'Capítulo Publicado Correctamente' : 'Capítulo Ocultado Correctamente')
            router.refresh()

        } catch {
            toast.error('Ocurrio un error, recargue e intente de nuevo')
        }
    }

    const removeChapter= async () => {
        try {
            await axios.delete(`/api/course/${courseId}/chapter/${chapter.id}`)

            toast.success('Capítulo Eliminado Correctamente')
            router.replace(`/teacher/${courseId}`)

        } catch {
            toast.error('Ocurrio un error, recague e intente de nuevo')
        }
    }

    return (
        <>
            <Button
                className=" bg-violet-500 hover:bg-violet-400 transition-colors mb-4 cursor-pointer"
                onClick={() => router.back()}
            >
                <ArrowLeft className=" w-5 h-5" />
                Regresar
            </Button>
        
            <div className="p-6 bg-white rounded-md flex justify-between items-center">
                <TitleBlock title="Configuración del Capítulo" icon={Cog} />

                <div className="flex gap-2 items-center">
                    {chapter?.isPublished ? (
                        <Button 
                            className=" bg-violet-500 hover:bg-violet-400 transition-colors cursor-pointer" 
                            onClick={() => onPublish(false)}
                        >
                            <EyeOff className=" w-4 h-4" />
                            Ocultar
                        </Button>
                    ) : (
                        <Button 
                            className=" bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer"
                            onClick={() => onPublish(true)}
                        >
                            <Eye className=" w-4 h-4" />
                            Publicar
                        </Button>
                    )}

                    <Button
                        className=" bg-red-500 hover:bg-red-400 transition-colors p-2 cursor-pointer"
                        onClick={removeChapter}
                    >
                        <Trash className=" w-6 h-6" />
                    </Button>
                </div>
            </div>

            <ChapterTitleForm courseId={courseId} chapter={chapter} />

            
            <ChapterVideoForm 
                chapterId={chapter.id}
                courseId={courseId}
                videoUrl={chapter.videoUrl}
            />

        </>
    )
}
