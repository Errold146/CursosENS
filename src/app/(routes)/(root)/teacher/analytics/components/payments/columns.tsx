"use client"

import { ColumnDef } from "@tanstack/react-table"

export type PurchaseWithCourse = {
    id: string
    userId: string
    userEmail: string
    courseId: string
    price: string
    createdAt: Date
    updatedAt: Date
    course: {
        id: string
        title: string,
        slug: string
        imageUrl: string
        price: string
    }
}

export const columns: ColumnDef<PurchaseWithCourse>[] = [
    {
        accessorKey: "createdAtFormatted",
        header: "Fecha de Compra",
        cell: ({row}) => {
            const date = new Date(row.original.createdAt).toLocaleDateString("es-ES")
            return <div className=" font-medium">{date}</div>
        }
    },
    {
        accessorKey: "userEmail",
        header: "Cliente",
    },
    {
        accessorKey: "course.title",
        header: "Curso",
    },
    {
        accessorKey: "price",
        header: "Precio",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("price") as string)
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)
            return <div>{formatted}</div>
        },
    },
]