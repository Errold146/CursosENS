export type PurchaseWithCourse = {
    id: string
    userId: string
    courseId: string
    course: {
        id: string
        title: string
        price: string | null
    }
}

type PurchaseWithFormatedDate = PurchaseWithCourse & {
    createdAtFormated: string
}

export type OrderListProps = {
    purchases: PurchaseWithFormatedDate[]
    recipts: {
        paymentIntentId: string
        receiptUrl: string | null
    }[]
}