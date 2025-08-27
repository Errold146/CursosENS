import { Metadata } from "next";
import { ReceiptText } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server"

import { OrderList } from "./components";
import { getUserReceipts } from "@/actions/getReceipStripe";
import { getUserPurchases } from "@/actions/getUserPurchases";

export const metadata: Metadata = {
    title: "Recibos de compra",
    description: "En esta página se encuentran los recibos de las compras realizadas"
}

export default async function OrdersPage() {

    const user = await currentUser()
    if ( !user ) return <p>Por favor inicia sesión</p>;

    const purchases = await getUserPurchases(user.id)
    const receipts = await getUserReceipts(user.id)

    return (
        <div className=" my-4 mx-4 border-gray-200 rounded-lg bg-white p-6">
            <div className=" flex items-center mb-6 gap-1">
                <div className=" p-2 rounded-full bg-violet-400">
                    <ReceiptText className=" w-5 h-5 text-white" />
                </div>
                <h1 className=" text-xl font-semibold">Todos los recibos de compra</h1>
            </div>

            <OrderList 
                purchases={purchases}
                recipts={receipts}
            />
        </div>
    )
}
