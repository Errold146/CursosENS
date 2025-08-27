import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(
    _req: Request,
    {params}: {params: {courseId: string}}
) {
    const { userId } = await auth()
    const { courseId } = await params
    if ( !userId ) return new NextResponse('Acceso Denegado', { status: 401 });

    const user = await currentUser()

    try {
        const course = await prisma.course.findUnique({
            where: {
                id: courseId,
                isPublished: true
            }, 
            include: {
                chapters: {
                    orderBy: {
                        position: 'asc'
                    }
                }
            }
        })

        if ( !course ) return new NextResponse("No se encontro el curso", { status: 404 });

        const purchase = await prisma.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId
                }
            }
        })

        if ( purchase ) return new NextResponse("Curso comprado anteriormente", { status: 400 });

        const priceCourse = course.price ? Math.round(Number(course.price) * 100) : 0

        if (priceCourse < 50)  return new NextResponse("El monto mínimo debe ser $0.50 USD", { status: 400 });

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [
            {
                quantity: 1,
                price_data: {
                    currency: "USD",
                    product_data: {
                        name: course.title,
                    },
                    unit_amount: priceCourse
                }
            }
        ]

        let stripeCustomer = await prisma.stripeCustomer.findUnique({
            where: {
                userId
            },
            select: {
                stripeCustomerId: true
            }
        })

        if ( !stripeCustomer ) {
            const customer = await stripe.customers.create({
                email: user?.emailAddresses[0].emailAddress
            })

            stripeCustomer = await prisma.stripeCustomer.create({
                data: {
                    userId,
                    stripeCustomerId: customer.id
                }
            })
        }

        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomer.stripeCustomerId,
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.slug}/${course.chapters[0].id}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/courses/${course.slug}?cancelled=1`,
            metadata: {
                courseId: course.id,
                userId: userId,
                price: course.price ? course.price : "0"
            }
        })

        return NextResponse.json({ url: session.url })

    } catch (error) {
        console.log('[COURSE_CHECKOUT]: ', error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}