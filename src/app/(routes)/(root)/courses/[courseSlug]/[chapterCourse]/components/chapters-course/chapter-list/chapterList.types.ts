import { Chapter, UserProgress } from "@prisma/client"

export type ChapterListProps = {
    chapters: Chapter[] | null
    courseSlug: string
    currentChapter: string
    userProgress: UserProgress[]
}