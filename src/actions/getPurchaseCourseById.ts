"use server"

import prisma from "@/lib/prisma"

export const getPurchaseCourseById = async (userId: string, courseId: string): Promise<boolean> => {
    try {
        const purchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            },
            include: {
                course: true
            }
        })

        return !!purchase

    } catch (error) {
        console.log('[GET_PURCHASE_COURSE]: ', error)
        return false
    }
}