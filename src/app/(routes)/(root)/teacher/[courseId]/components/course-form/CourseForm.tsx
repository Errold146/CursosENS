"use client"

import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { Cog } from "lucide-react";
import { useForm } from "react-hook-form";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { formSchema } from "./courseForm.form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CourseFormProps } from "./courseForm.types";
import { TitleBlock } from "../title-block/TitleBlock";

export function CourseForm(props: CourseFormProps) {
    const { course } = props;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: course.title || '',
            slug: course.slug || '',
            description: course.description || '',
            category: course.category || '',
            level: course.level || '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/course/${course.id}`, values)
            toast.success('Información Guardada Correctamente')

        } catch {
            toast.error('Ocurrio un error, recargue e intente de nuevo')
        }
    };

    return (
        <div className="p-6 bg-white rounded-md">
            <TitleBlock title="Configuración del curso" icon={Cog} />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre del curso</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: Curso de ReactJS" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Este será el nombre del curso visible a todos los usuarios.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Url del curso</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej: curso-react-js" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Intenta que se parezca al Nombre del curso.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categorias del curso</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona la categoría del curso" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="frontend">FrontEnd</SelectItem>
                                            <SelectItem value="backend">BackEnd</SelectItem>
                                            <SelectItem value="fullstack">FullStack</SelectItem>
                                            <SelectItem value="infrastructure">Infraestructura</SelectItem>
                                            <SelectItem value="ux/ui">Diseño UX|UI</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        
                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nivel del curso</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona el nivel del curso" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="principiante">Principiante</SelectItem>
                                            <SelectItem value="intermedio">Intermedio</SelectItem>
                                            <SelectItem value="avanzado">Avanzado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción del curso</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Ej: Este curso muestra todos los fundamentos de..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Breve resumen del curso con detalles del mismo.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    <Button 
                        type="submit"
                        className=" bg-emerald-500 hover:bg-emerald-400 hover:cursor-pointer transition-colors md:w-auto w-full"
                    >Guardar Info</Button>
                </form>
            </Form>
        </div>
    );
}
