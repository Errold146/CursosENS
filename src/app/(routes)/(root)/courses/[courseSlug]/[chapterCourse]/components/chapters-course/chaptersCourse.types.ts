import { Chapter, UserProgress } from "@prisma/client"

export type ChaptersCourseProps = {
    chapters: Chapter[] | null
    courseSlug: string
    chapterCourse: string
    userProgress: UserProgress[]
}