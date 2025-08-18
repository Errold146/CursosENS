"use client"

import { z } from "zod"
import axios from "axios"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formSchema } from "./formCreateCourse.form"

export function FormCreateCourse() {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            courseName: "",
            slug: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.post('/api/course', values)
            toast.success('Curso Creado Correctamente')
            router.push(`/teacher/${res.data.id}`)

        } catch (error) {
            console.error(error)
            toast.error('Ocurrio un error, recague e intente de nuevo.')
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                <FormField
                    control={form.control}
                    name="courseName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre del Curso</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Curso de ReactJS" {...field} />
                            </FormControl>
                            <FormMessage  />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug del Curso</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: curso-reactjs" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Crear Curso</Button>
            </form>
        </Form>
    )
}
