"use client"

import axios from "axios";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { SuscriptorsChartProps } from "./suscriptorsChart.types";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function SuscriptorsChart() {

    const [data, setData] = useState<SuscriptorsChartProps[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchSuscribers = async () => {
            try {
                const res = await axios("/api/analytics/total-suscriptors")
                setData(res.data)

            } catch (error) {
                console.error('Error al obtener los suscriptores: ', error)

            } finally {
                setIsLoading(false)
            }
        }

        fetchSuscribers()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Últimos Suscriptores</CardTitle>
                <CardDescription>Suscriptores de los últimos 6 meses</CardDescription>
            </CardHeader>

            { isLoading ? (
                <div className="text-sm text-muted-foreground h-36 flex flex-col items-center justify-center space-y-2">
                    <span>Cargando Suscriptores ...</span>
                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-emerald-400 border-t-transparent"></div>
                </div>

            ) : (
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={data}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar
                                dataKey="users"
                                fill="#8b5cf6" 
                                radius={8}
                                style={{ filter: "drop-shadow(0px 4px 8px rgba(139, 92, 246, 0.7))" }}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            )}

            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Creciendo exponencialmente <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Mostrando el total de suscriptores de los últimos 6 meses
                </div>
            </CardFooter>
        </Card>
    )
}
