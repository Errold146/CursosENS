import Stripe from "stripe";
import { getStripeCustomerId } from "./getStripeCustomerId";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-07-30.basil"
})

export const getUserReceipts = async (userId: string) => {
    try {
        const stripeCustomerId = await getStripeCustomerId(userId)
        if ( !stripeCustomerId ) throw new Error("No hay customerId");

        const paymentsIntents = await stripe.paymentIntents.list({
            customer: stripeCustomerId,
            limit: 10
        })

        const receipts = await Promise.all(
            paymentsIntents.data.map( async pay => {
                if ( typeof pay.latest_charge === "string" ) {
                    const charge = await stripe.charges.retrieve(
                        pay.latest_charge
                    )

                    return {
                        paymentIntentId: pay.id,
                        receiptUrl: charge.receipt_url || null
                    }
                }

                return {
                    paymentIntentId: pay.id,
                    receiptUrl: null
                }
            })
        )

        return receipts

    } catch (error) {
        console.error("[GET_RECEIPTS_STRIPE]: ", error)
        return []
    }
}