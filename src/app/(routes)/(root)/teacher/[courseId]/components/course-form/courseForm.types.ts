import { Chapter, Course } from "@prisma/client"

export type CourseFormProps = {
    course: CourseRelations
}

type CourseRelations = Course & { chapters: Chapter[] }