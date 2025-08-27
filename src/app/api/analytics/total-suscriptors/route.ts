import { NextResponse } from "next/server";
import { getSuscribersByMonth } from "@/actions/getSuscribersByMonth";

export async function GET() {
    try {
        const data = await getSuscribersByMonth()
        return NextResponse.json(data)

    } catch (error) {
        console.error('[TOTAL_SUSCRIPTORS]: ', error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}