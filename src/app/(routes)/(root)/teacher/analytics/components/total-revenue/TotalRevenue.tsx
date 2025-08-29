"use client"

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import { TotalRevenueProps } from "./totalRevenue.types";
import axios from "axios";

export const description = "A line chart with a label"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#8b5cf6",
    },
    mobile: {
        label: "Mobile",
        color: "#8b5cf6",
    },
} satisfies ChartConfig

export function TotalRevenue() {

    const [data, setData] = useState<TotalRevenueProps[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchRevenue = async () => {
            try {
                const res = await axios("/api/analytics/revenue-by-month")
                setData(res.data)

            } catch (error) {
                console.error("Error al obtener los datos", error)   
            
            } finally {
                setIsLoading(false)
            }
        }

        fetchRevenue()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total de ganacias</CardTitle>
                <CardDescription>Ganancias de los últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
                
                {isLoading ? (
                    <div className="text-sm text-muted-foreground h-36 flex flex-col items-center justify-center space-y-2">
                        <span>Cargando Información ...</span>
                        <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-400 border-t-transparent"></div>
                    </div>
                ): (
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={data}
                            margin={{
                                top: 20,
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Line
                                dataKey="revenue"
                                type="natural"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                dot={{
                                    fill: "#8b5cf6",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Line>
                        </LineChart>
                    </ChartContainer>
                )}
             
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Creciendo exponencialmente <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Mostrando las ganancias de lo últimos 6 meses.
                </div>
            </CardFooter>
        </Card>
    )
}

