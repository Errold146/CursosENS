import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale"

export const getUserPurchases = async (userId: string) => {
    try {
        const purchases = await prisma.purchase.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                course: {
                    select: {
                        id: true,
                        title: true,
                        price: true
                    }
                }
            }
        })

        const formatedPurchases = purchases.map( pur => ({
            ...pur,
            createdAtFormated: format(pur.createdAt, "dd/MM/yyyy", {
                locale: es
            })
        }))

        return formatedPurchases

    } catch (error) {
        console.error("[GET_USER_PURCHASES]: ", error)
        return []
    }
}