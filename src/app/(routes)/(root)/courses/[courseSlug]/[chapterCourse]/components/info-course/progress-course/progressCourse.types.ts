import { Chapter, Course, UserProgress } from "@prisma/client"

export type ProgressCourseProps = {
    userProgress: UserProgress[]
    chapterCourseId: string
    infoCourse: Course & { chapters: Chapter[] }
}