"use server"

import prisma from "@/lib/prisma";

export const getUserProgressCourse = async (courseId: string, userId: string): Promise<number> => {
    try {
        const purchase = await prisma.purchase.findFirst({
            where: {
                userId,
                courseId
            }
        })

        if ( !purchase ) return 0;

        const totalChapters = await prisma.chapter.count({
            where: {
                courseId
            }
        })

        if ( totalChapters === 0 ) return 0;

        const completedCahpters = await prisma.userProgress.count({
            where: {
                userId,
                isCompleted: true,
                chapter: {
                    courseId
                }
            }
        })

        const progressPercentage = Math.round( (completedCahpters / totalChapters) * 100 )

        return progressPercentage

    } catch (error) {
        console.log('[GET_USER_PROGRESS_COURSE]: ', error)
        return 0
    }
}