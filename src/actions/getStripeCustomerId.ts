import prisma from "@/lib/prisma";

export const getStripeCustomerId = async (userId: string) => {
    try {
        const stripeCustomer = await prisma.stripeCustomer.findUnique({
            where: {
                userId
            }
        })

        return stripeCustomer?.stripeCustomerId || null

    } catch (error) {
        console.error("[GET_STRIPE_CUSTOMER_ID]: ", error)
        return null
    }
}