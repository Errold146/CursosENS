import { Chapter } from "@prisma/client";

export interface FormChapterNameProps {
    idCourse: string;
    setShowInputChapter: (value: boolean) => void;
    onAddChapter: (chapter: Chapter) => void;
}