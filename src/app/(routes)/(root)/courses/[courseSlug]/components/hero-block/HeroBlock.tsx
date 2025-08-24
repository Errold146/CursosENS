"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ChartNoAxesColumn, CreditCard, Eye, Timer } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { IconBadge } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { HeroBlockProps } from "./heroBlock.types";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

export function HeroBlock(props: HeroBlockProps) {

    const router = useRouter()
    const { course, purchaseCourse } = props
    const { title, id, description, price, level, imageUrl, updatedAt, slug, chapters } = course

    const [isLoading, setIsLoading] = useState(false)

    const enrollCourse = async () => {
        setIsLoading(true)
        if ( !price || price.toLowerCase() === "free" || price === "0" ) {
            try {
                await axios.post(`/api/course/${id}/enroll`)
                toast.success('Felicidades, has adquirido este curso')
                router.push(`/courses/${slug}/${chapters[0].id}`)

            } catch (error) {
                console.error(error)
                toast.error('Ocurrio un error, recargue e intetent de nuevo')

            } finally {
                setIsLoading(false)
            }
        }
    }

    const rediretToCourse = () => {
        router.push(`/courses/${slug}/${chapters[0].id}`)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
                <h2 className=" text-3xl font-semibold">{title}</h2>
                <p className=" text-balance mt-2">{description}</p>

                <div className="flex flex-col gap-3 mt-5 text-gray-600">
                    <IconBadge icon={Timer} text="7h 40 min" />
                    <IconBadge 
                        icon={Calendar} 
                        text={`Última actualización: ${new Date(updatedAt).toLocaleDateString("es-ES")}`} 
                    />
                    <IconBadge icon={ChartNoAxesColumn} text={level || ""} />
                </div>

                <h2 className=" text-xl font-semibold my-4">{formatCurrency(price!)}</h2>

                {purchaseCourse ? (
                    <Button 
                        onClick={rediretToCourse}
                        className=" bg-emerald-500 hover:bg-emerald-400 transition-colors"
                        disabled={isLoading}
                    >
                        <Eye className=" w-5 h-5" />
                        Ir al Curso
                    </Button>
                ): (
                    <Button
                        onClick={enrollCourse}
                        className=" bg-violet-500 hover:bg-violet-400 transition-colors"
                        disabled={isLoading}
                    >
                        <CreditCard className=" w-5 h-5" />
                        Inscribirce Ahora
                    </Button>
                )}
            </div>

            <Image
                src={imageUrl || "/no-photo.png"}
                alt={`Imagen del: ${title}`}
                width={500}
                height={400}
                priority
                className=" rounded-md"
            />
        </div>
    )
}
