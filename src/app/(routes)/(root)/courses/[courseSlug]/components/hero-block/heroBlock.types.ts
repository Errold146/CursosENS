import { Chapter, Course } from "@prisma/client"

export type HeroBlockProps = {
    course: Course & {chapters: Chapter[]}
    purchaseCourse: boolean
}