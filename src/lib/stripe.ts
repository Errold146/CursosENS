import Stripe from 'stripe';

if ( !process.env.STRIPE_SECRET_KEY ) throw new Error("Falta la variable de entorno de Stripe")

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-07-30.basil",
    typescript: true
})