import { Chapter, Course } from "@prisma/client"

export type ListCoursesProps = {
    title: string
    courses: (Course & {chapters: Chapter[]})[] | null
}