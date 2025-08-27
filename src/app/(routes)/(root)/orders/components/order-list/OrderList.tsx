"use client"

import { toast } from "sonner";
import { ExternalLink } from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { OrderListProps } from "./orderList.types";

export function OrderList(props: OrderListProps) {

    const { purchases, recipts } = props

    const totalPurchases = purchases.reduce((acc, pur) => {
        const rawPrice = pur.course.price
        const price = rawPrice && !isNaN(Number(rawPrice)) ? parseFloat(rawPrice) : 0
        return acc + price
    }, 0)

    const formatedTotal = formatCurrency(totalPurchases.toString() || "0")

    const downloadReceipts = (index: number) => {
        const receiptUrl = recipts[index].receiptUrl
        if ( receiptUrl ) {
            window.open(receiptUrl, "_blank")
        } else {
            toast.error("No se ha encontrado el recibo")
        }
    }

    return (
        <Table className="my-6 w-full border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <TableCaption className="text-gray-500 text-sm mt-2">
                Listado de tus últimas compras
            </TableCaption>

            <TableHeader className="bg-gray-50">
                <TableRow>
                    <TableHead className="w-[120px] text-left text-gray-700 uppercase text-xs tracking-wider py-3 px-4 border-b border-gray-200">
                        Fecha
                    </TableHead>
                    <TableHead className="text-center text-gray-700 uppercase text-xs tracking-wider py-3 px-4 border-b border-gray-200">
                        Curso
                    </TableHead>
                    <TableHead className="text-left text-gray-700 uppercase text-xs tracking-wider py-3 px-4 border-b border-gray-200">
                        Estado
                    </TableHead>
                    <TableHead className="text-center text-gray-700 uppercase text-xs tracking-wider py-3 px-4 border-b border-gray-200">
                        Recibo
                    </TableHead>
                    <TableHead className="text-right text-gray-700 uppercase text-xs tracking-wider py-3 px-4 border-b border-gray-200">
                        Precio
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {purchases.map((pur, ind) => (
                    <TableRow
                        key={pur.id}
                        className="hover:bg-gray-50 transition-colors"
                    >
                        <TableCell className="font-medium text-gray-800 py-3 px-4">
                            {pur.createdAtFormated}
                        </TableCell>
                        <TableCell className="text-center text-gray-800 py-3 px-4">
                            {pur.course.title}
                        </TableCell>
                        <TableCell>
                            <span className="bg-emerald-100 text-emerald-700 font-medium py-1 px-3 rounded-full text-sm">
                                Pagado
                            </span>
                        </TableCell>
                        <TableCell className="flex justify-center py-3 px-4">
                            <Button
                                className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                                onClick={() => downloadReceipts(ind)}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Ver Recibo
                            </Button>
                        </TableCell>
                        <TableCell className="text-right text-gray-800 py-3 px-4 font-medium">
                            {formatCurrency(pur.course.price || "0")}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <TableFooter className="bg-gray-50">
                <TableRow>
                    <TableCell colSpan={4} className="text-right font-semibold text-gray-700 py-3 px-4 border-t border-gray-200 text-lg">
                        Total Gastado
                    </TableCell>
                    <TableCell className="text-right font-semibold text-lg text-gray-900 py-3 px-4 border-t border-gray-200">
                        {formatedTotal}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
