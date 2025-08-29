import { SuscriptorsChart, TotalRevenue, Payments } from "./components"

export default function AnalyticsPage() {
    return (
        <div className=" p-6">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
                <SuscriptorsChart />

                <TotalRevenue />
            </div>

            <Payments />
        </div>
    )
}
