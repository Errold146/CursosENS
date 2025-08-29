import { NextResponse } from "next/server";
import { getRevenueByMonth } from "@/actions/getRevenueByMonth";

export async function GET() {
    try {
        const data = await getRevenueByMonth()
        return NextResponse.json(data)

    } catch (error) {
        console.error('[REVENUE_BY_MONTH]: ', error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}