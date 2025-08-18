import { Chapter } from "@prisma/client"

export type ChapterBlockProps = {
    idCourse: string
    chapters: Chapter[] | null
}