import prisma from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";

export async function getLastPurchases(limit: number = 10) {
    const purchases = await prisma.purchase.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: limit,
        include: {
            course: {
                select: {
                    title: true,
                    slug: true,
                    imageUrl: true,
                    price: true
                }
            }
        }
    })

    const clerk = await clerkClient()

    const purchaseWithEmails = await Promise.all(
        purchases.map( async pur => {
            const user = await clerk.users.getUser(pur.userId)

            return {
                ...pur,
                userEmail: user.emailAddresses[0].emailAddress || "Sin email registrado"
            }
        })
    )

    return purchaseWithEmails
}