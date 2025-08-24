"use server"

import prisma from "@/lib/prisma";
import { Chapter, Course } from '@prisma/client';

export const getHomeCourses = async (): Promise< (Course & { chapters: Chapter[] })[] | null > => {
    try {
        const courses = await prisma.course.findMany({
            where: {
                isPublished: true
            },
            orderBy: {
                createdAt: 'desc'
            }, 
            include: {
                chapters: {
                    where: {
                        isPublished: true
                    }
                }
            }
        })

        return courses

    } catch (error) {
        console.log('[ERROR_COURSE_CHAPTERS]: ', error)
        return null
    }
}