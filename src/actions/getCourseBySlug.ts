"use server"

import prisma from "@/lib/prisma";
import { Course, Chapter } from '@prisma/client';

export const getCourseBySlug = async (slug: string): Promise< (Course & {chapters: Chapter[]}) | null > => {
    try {
        const course = await prisma.course.findUnique({
            where: {
                slug,
                isPublished: true
            },
            include: {
                chapters: {
                    where: {
                        isPublished: true
                    },
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        })

        return course

    } catch (error) {
        console.log("[GET_COURSE_SLUG]: ", error)
        return null
    }
}