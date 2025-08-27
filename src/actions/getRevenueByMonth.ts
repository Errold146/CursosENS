import prisma from "@/lib/prisma";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { es } from "date-fns/locale";

export async function getRevenueByMonth() {

    const now = new Date()
    const months = Array.from({length: 6}, (_, i) => subMonths(now, 5 - i))

    const res = await Promise.all(
        months.map( async monthDate => {
            const start = startOfMonth(monthDate)
            const end = endOfMonth(monthDate)

            const purchases = await prisma.purchase.findMany({
                where: {
                    createdAt: {
                        gte: start,
                        lte: end
                    }
                },
                include: {
                    course: {
                        select: {
                            price: true
                        }
                    }
                }
            })

            const totalRevenue = purchases.reduce((sum, pur) => {
                const coursePrice = Number.isFinite(
                    parseFloat(pur.course.price || '')
                ) ? parseFloat(pur.course!.price!) : 0
                
                return sum + coursePrice
            }, 0)

            return {
                month: format(start, "MMMM", { locale: es }),
                revenue: Number(totalRevenue.toFixed(2))
            }
        })
    )
    
    return res
}