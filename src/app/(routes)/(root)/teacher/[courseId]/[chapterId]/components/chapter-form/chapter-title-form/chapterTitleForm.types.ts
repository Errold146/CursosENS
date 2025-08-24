import { Chapter } from "@prisma/client"

export type ChapterTitleFormProps = {
    courseId: string
    chapter: Chapter
}