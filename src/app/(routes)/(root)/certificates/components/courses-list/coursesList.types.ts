import { Chapter, Course } from "@prisma/client"

export type CoursesListProps = {
    courses: (Course & {chapters: Chapter[]; progress: number})[]
    userName: string
}