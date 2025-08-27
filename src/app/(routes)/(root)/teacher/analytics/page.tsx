import { SuscriptorsChart, TotalRevenue } from "./components"

export default function AnalyticsPage() {
    return (
        <div className=" p-6">
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
                <SuscriptorsChart />

                <TotalRevenue />
            </div>

            <p>Tabla de pagos y usuarios</p>
        </div>
    )
}
