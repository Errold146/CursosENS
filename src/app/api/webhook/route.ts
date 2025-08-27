import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    
    const body = await req.text()
    const headerList = await headers()
    const signature = headerList.get("stripe-signature") as string

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error) {
        console.log("[API_WEBHOOK]: ", error)
        return new NextResponse("Webhook Error", { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session
    const userId = session?.metadata?.userId
    const courseId = session?.metadata?.courseId
    const coursePrice = session?.metadata?.price
    const price = coursePrice ? Number(coursePrice) : 0

    if ( event.type === "checkout.session.completed" ) {
        if ( !userId || !courseId || !coursePrice ) return new NextResponse("Webhook Error: Faltan datos", { status: 400 });

        const existingPurchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        })

        if ( !existingPurchase ) {
            await prisma.purchase.create({
                data: {
                    userId,
                    courseId,
                    price: price.toString()
                }
            })
        } else {
            return new NextResponse(`Wehook Error: Typo Evento Inválido: ${event.type}`, { status: 200 })
        }
    }

    return new NextResponse(null, { status: 200 });
}