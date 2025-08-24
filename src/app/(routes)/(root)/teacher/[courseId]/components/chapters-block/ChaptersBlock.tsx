"use client"

import axios from "axios";
import { toast } from "sonner";
import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GripVertical, ListCheck, Loader2, Pencil, PlusCircle } from "lucide-react";
import { DragDropContext, Droppable, DropResult, Draggable } from "@hello-pangea/dnd";

import { Button } from "@/components/ui/button";
import { TitleBlock } from "../title-block/TitleBlock";
import { ChapterBlockProps } from "./chaptersBlock.types";
import { FormChapterName } from "./form-chapter-name/FormChapterName";

export function ChaptersBlock(props: ChapterBlockProps) {

    const router = useRouter()
    const { idCourse, chapters } = props
    const [isUpdating, setIsUpdating] = useState(false)
    const [chapterList, setChapterList] = useState(chapters ?? [])
    const [showInputChapter, setShowInputChapter] = useState(false)

    useEffect(() => {
        setChapterList(chapters ?? [])
    }, [chapters])
    

    const handleAddChapter = (newChapter: Chapter) => {
        setChapterList(prev => [...prev, newChapter]); 
    };

    const onDragEnd = (res: DropResult) => {
        if ( !res.destination ) return;

        const items = Array.from(chapterList)
        const [ reorderedItem ] = items.splice(res.source.index, 1)
        items.splice(res.destination.index, 0, reorderedItem)

        setChapterList(items)

        const bulkUpdate = items.map((chapter, index) => ({
            id: chapter.id,
            position: index
        }))

        onReorder(bulkUpdate)
    }

    const onReorder = async (updateData: {id: string, position: number}[]) => {
        try {
            setIsUpdating(true)
            await axios.put(`/api/course/${idCourse}/chapter/reorder`, {
                list: updateData
            })

            toast.success('Capítulo reorganizado correctamente')
            router.refresh()

        } catch {
            toast.error('Ocurrio un error, recargue e intente de nuevo')

        } finally {
            setIsUpdating(false)
        }
    }

    const onEditChapter = (chapterId: string) => {
        router.push(`/teacher/${idCourse}/${chapterId}`)
    }

    return (
        <div className="p-6 bg-white rounded-md h-fit relative">
            <TitleBlock title="Capitulos del curso" icon={ListCheck} />

            <div className="flex flex-col md:flex-row gap-2 items-center md:justify-between justify-center mb-3"
            >
                <p className="w-full md:w-auto text-center md:text-left font-semibold text-lg">Capítulos Completos</p>

                <Button
                    className="bg-violet-500 hover:bg-violet-400 transition-colors w-full md:w-auto hover:cursor-pointer"
                    onClick={() => setShowInputChapter(true)}
                    disabled={showInputChapter}
                >
                    <PlusCircle className="w-4 h-4 mr-1" />
                    Crear Nuevo Capítulo
                </Button>
            </div>

            {showInputChapter && <FormChapterName 
                setShowInputChapter={setShowInputChapter}
                idCourse={idCourse}
                onAddChapter={handleAddChapter}
            />}

            {isUpdating && (
                <div className=" absolute top-0 right-0 flex items-center justify-center w-full h-full bg-slate-500/20">
                    <Loader2 className=" w-6 h-6 animate-spin text-violet-500" />
                </div>
            )}

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="chapters">
                    {provider => (
                        <div 
                            {...provider.droppableProps} 
                            ref={provider.innerRef}
                            className="flex flex-col gap-2"
                        >
                            {chapterList?.map((chapter, index) => (
                                <Draggable 
                                    key={chapter.id} 
                                    draggableId={chapter.id}
                                    index={index}
                                >
                                    {provider => (
                                        <div
                                            ref={provider.innerRef}
                                            {...provider.draggableProps}
                                            {...provider.dragHandleProps}
                                            className="flex gap-2 items-center bg-slate-100 rounded-md py-2 px-4 text-sm justify-between"
                                        >
                                            <div className="flex gap-2 items-center">
                                                <GripVertical className=" h-4 w-4" />
                                                <p>{chapter.title}</p>
                                            </div>
                                            
                                            <div className="flex gap-2 items-center px-2 py-1">
                                                {chapter.isPublished ? (
                                                    <div 
                                                        onClick={() => onEditChapter(chapter.id)}
                                                        className="flex items-center gap-2 text-emerald-600"
                                                    >
                                                        <span>Publicado</span>
                                                        <button 
                                                            className="bg-emerald-100 cursor-pointer rounded-md font-semibold px-2 py-1 "
                                                            onClick={() => onEditChapter(chapter.id)}
                                                        >
                                                            <Pencil className=" w-5 h-6" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div 
                                                        className="flex items-center gap-2 text-violet-600  "
                                                    >
                                                        <span>Sin Publicar</span>
                                                        <button 
                                                            className="bg-violet-100 cursor-pointer rounded-md font-semibold px-2 py-1 "
                                                            onClick={() => onEditChapter(chapter.id)}
                                                        >
                                                            <Pencil className=" w-5 h-6" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            {provider.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
}
