import { getLastPurchases } from "@/actions/getLastPurchases"
import { DataTable } from "./data-table"
import { columns, PurchaseWithCourse } from "./columns"

export async function Payments() {

    const lastPurchses = await getLastPurchases()

    const mappedPurchases = lastPurchses.map((purchase) => ({
        ...purchase,
        price: String(purchase.course.price ?? "0"),
    }))

    return (
        <div className=" mx-auto my-10 w-full border-gray-300 shadow-md bg-white p-4 rounded-md">
            <DataTable 
                columns={columns} 
                data={mappedPurchases as PurchaseWithCourse[]} 
            />
        </div>
    )
}
