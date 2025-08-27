import prisma from "@/lib/prisma";

export const getUserProgressByCourses = async (userId: string, courseId: string): Promise<number> => {
    try {
        const purchase = await prisma.purchase.findFirst({ where: { userId, courseId }})
        if ( !purchase ) return 0;

        const totalChapter = await prisma.chapter.count({ where: {courseId} })
        if ( !totalChapter ) return 0;

        const completedChapter = await prisma.userProgress.count({
            where: {
                userId,
                isCompleted: true,
                chapter: {
                    courseId
                }
            }
        })

        const progressPercentage = Math.round((completedChapter / totalChapter) * 100)
        return progressPercentage

    } catch (error) {
        console.error('[GET_USER_PROGRESS_BY_COURSES]: ', error)
        return 0;
    }
}