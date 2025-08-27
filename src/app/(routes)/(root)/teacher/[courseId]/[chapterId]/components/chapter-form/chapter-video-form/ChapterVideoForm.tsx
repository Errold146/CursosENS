"use client"

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Upload, Video } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { TitleBlock } from "../../../../components";
import { ChapterVideoFormProps } from "./chapterVideoForm.types";

export function ChapterVideoForm(props: ChapterVideoFormProps) {

    const router = useRouter()
    const { chapterId, courseId, videoUrl } = props
    const [onEditVideo, setOnEditVideo] = useState(false)

    const onSubmit = async ( url: string ) => {
        try {
            await axios.patch(`/api/course/${courseId}/chapter/${chapterId}`, {
                videoUrl: url
            })

            toast.success('Video subido correctamente')
            router.refresh()

        } catch {
            toast.error('Ocurrio un error, recargue e intente de nuevo')
        }
    }

    return (
        <div className=" mt-6 p-6 bg-white rounded-md">
            <TitleBlock title="Configuración del video" icon={Video} />

            {videoUrl ? (
                <video src={videoUrl} controls className=" rounded-md" />
            ): (
                <p 
                    className=" flex items-center justify-center text-lg font-semibold"
                >
                    No hay video aún, sube tu video en esta sección.
                </p>
            )}

            <div className=" mt-4 p-2 rounded-md border border-gray-300">
                <Button 
                    className=" bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer"
                    onClick={() => setOnEditVideo(true)}
                >
                    {onEditVideo ? (
                        <>
                            <Upload className="w-5 h-5" />
                            <span>Arrastra o selecciona el video</span>
                        </>
                    ) : (
                        <>
                            <Pencil className="w-5 h-5" />
                            <span>Editar Video</span>
                        </>
                    )}
                </Button>

                {onEditVideo && (
                    <UploadButton 
                        className=" w-full bg-slate-200 rounded-md p-2 mt-2"
                        endpoint="chapterVideo"
                        onClientUploadComplete={url => {
                            if ( url ) {
                                onSubmit(url[0].serverData.url)
                            }
                        }}
                    />
                )}
            </div>
        </div>
    )
}
