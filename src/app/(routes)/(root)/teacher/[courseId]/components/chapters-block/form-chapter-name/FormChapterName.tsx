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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormChapterNameProps } from "./formChapterName.types"
import { formSchema } from "./formChapterName.form"

export function FormChapterName(props: FormChapterNameProps) {

    const router = useRouter()
    const { idCourse, setShowInputChapter, onAddChapter } = props;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post(`/api/course/${idCourse}/chapter`, {
                title: values.title,
            });

            const newChapter = response.data; // ✅ contiene id, title, position, etc.
            onAddChapter(newChapter); // ✅ pasa el objeto completo

            toast.success("Título del capítulo agregado");
            setShowInputChapter(false);

        } catch {
            toast.error("Ocurrió un error, recargue e intente de nuevo");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título del capítulo</FormLabel>
                            <FormControl>
                                <Input placeholder="Ej: Fundamentos del curso..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Escribe el título del capítulo, debe ser descriptivo y corto
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button 
                    type="submit"
                    className=' bg-emerald-500 hover:bg-emerald-400 hover:cursor-pointer mt-2 transition-colors md:w-auto w-full'
                    disabled={!form.formState.isValid}
                >
                    Crear Capítulo
                </Button>
            </form>
        </Form>
    )
}
