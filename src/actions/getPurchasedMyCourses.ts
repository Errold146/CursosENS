import prisma from "@/lib/prisma";
import { Chapter, Course } from '@prisma/client';
import { currentUser } from "@clerk/nextjs/server";

export const getPurchasedMyCourses = async (): Promise< (Course & {chapters: Chapter[]})[] | null > => {

    const user = await currentUser()
    if ( !user?.id ) throw new Error("No se ha identificado el usuario");

    try {
        const purchasedCourses = await prisma.course.findMany({
            where: {
                purchases: {
                    some: {
                        userId: user.id
                    }
                },
                isPublished: true
            },
            include: {
                chapters: {
                    where: {
                        isPublished: true
                    }
                }
            }
        })

        return purchasedCourses

    } catch (error) {
        console.error("[GET_PURCHASED_MY_COURSES]: ", error)
        return []
    }
}