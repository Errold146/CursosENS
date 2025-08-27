"use client";

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formSchema } from "./chapterTitleForm.form";
import { EditorDescription } from "@/components/shared";
import { ChapterTitleFormProps } from "./chapterTitleForm.types";

export function ChapterTitleForm(props: ChapterTitleFormProps) {

    const router = useRouter()
    const { courseId, chapter } = props;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: chapter.title || "",
            description: chapter.description || "",
            isFree: chapter.isFree || false,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/course/${courseId}/chapter/${chapter.id}`, {
                title: values.title,
                description: values.description,
                isFree: values.isFree
            })

            toast.success('Valores agregados correctamente')
            router.replace(`/teacher/${courseId}`)

        } catch {
            toast.error('Ocurrio un error, recargue e intente de nuevo')
        }
    };

    return (
        <div className="bg-white p-6 sm:p-8 rounded-md mt-6 shadow-sm w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-5 md:grid-cols-2"
                >
                    {/* Campo: Nombre del capítulo */}
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del capítulo</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Introducción a..."
                                        {...field}
                                        className="text-sm"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Campo: Capítulo público */}
                    <FormField
                        control={form.control}
                        name="isFree"
                        render={({ field }) => (
                            <FormItem className="flex items-start gap-3 mt-1">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="mt-1"
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-tight">
                                    <FormLabel>Capítulo público</FormLabel>
                                    <FormDescription>
                                        ¿Quieres que este capítulo sea gratis para todos?
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Campo: Descripción del capítulo */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="md:col-span-2 flex flex-col">
                                <FormLabel>Descripción del capítulo</FormLabel>
                                <FormControl>
                                    <div className="min-h-[150px]">
                                        <EditorDescription {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Botón: Guardar Cambios */}
                    <div className="md:col-span-2 flex justify-end">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer"
                        >
                            Guardar Cambios
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}