"use client"

import { useState } from "react";
import { Chapter } from "@prisma/client";
import { ListCheck, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TitleBlock } from "../title-block/TitleBlock";
import { ChapterBlockProps } from "./chaptersBlock.types";
import { FormChapterName } from "./form-chapter-name/FormChapterName";

export function ChaptersBlock(props: ChapterBlockProps) {

    const { idCourse, chapters } = props
    const [chapterList, setChapterList] = useState(chapters ?? [])
    const [showInputChapter, setShowInputChapter] = useState(false)

    const handleAddChapter = (newChapter: Chapter) => {
        setChapterList(prev => [...prev, newChapter]); 
    };

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

            {chapterList?.map((chapter, index) => (
                <p key={index}>{chapter.title}</p>
            ))}
        </div>
    )
}
