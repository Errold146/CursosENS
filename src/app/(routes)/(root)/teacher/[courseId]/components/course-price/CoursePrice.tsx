"use client"

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { DollarSign } from "lucide-react";

import { 
    Select, 
    SelectContent, 
    SelectGroup, 
    SelectItem, 
    SelectLabel, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { formatCurrency } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { TitleBlock } from "../title-block/TitleBlock";
import { CoursePriceProps } from "./coursePrice.types";

export function CoursePrice(props: CoursePriceProps) {

    const { idCourse, priceCourse } = props
    const [price, setPrice] = useState<string | undefined>(priceCourse || 'free')

    const onChangePrice = async () => {
        try {
            await axios.patch(`/api/course/${idCourse}`, { price })
            toast.success('Precio Establecido Correctamente')
            
        } catch {
            toast.error('Ocurrio un error, recargue e intente de nuevo')
        }
    }

    return (
        <div className="p-6 bg-white rounded-md h-full">
            <TitleBlock title="Precio del producto" icon={DollarSign} />

            <Select
                onValueChange={setPrice}
                defaultValue={price}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={"Selecciona el precio del curso"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Precio del curso</SelectLabel>
                        <SelectItem value="free">Gratis</SelectItem>
                        <SelectItem value="10">{formatCurrency(10)}</SelectItem>
                        <SelectItem value="20">{formatCurrency(20)}</SelectItem>
                        <SelectItem value="30">{formatCurrency(30)}</SelectItem>
                        <SelectItem value="40">{formatCurrency(40)}</SelectItem>
                        <SelectItem value="50">{formatCurrency(50)}</SelectItem>
                        <SelectItem value="60">{formatCurrency(60)}</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button 
                className=" bg-emerald-500 hover:bg-emerald-400 hover:cursor-pointer mt-3 transition-colors md:w-auto w-full"
                onClick={onChangePrice}
                disabled={!price || price === 'free'}
            >
                Guardar Precio
            </Button>
        </div>
    )
}
