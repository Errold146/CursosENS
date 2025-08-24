"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { HeaderCourseProps } from "./headerCourse.types";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoveLeft, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export function HeaderCourse(props: HeaderCourseProps) {
    const { idCourse, isPublished } = props;
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const onPublish = async (state: boolean) => {
        setIsLoading(true);

        try {
            await axios.patch(`/api/course/${idCourse}`, {
                isPublished: state,
            });

            if (isPublished) {
                toast.warning("El curso se ocultó correctamente.");
            } else {
                toast.success("El curso se publicó correctamente");
            }
        } catch {
            toast.error("Ocurrió un error, recargue e intente de nuevo");
        }

        router.refresh();
        setIsLoading(false);
    };

    const onRemoveCourse = async () => {
        await axios.delete(`/api/course/${idCourse}`);
        toast.success("Curso eliminado correctamente");
        router.replace("/teacher");
    };

    return (
        <div className="mb-4">
            <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
                
                {/* Botón regresar */}
                <Button
                    className="bg-violet-500 hover:bg-violet-400 hover:cursor-pointer transition-colors w-full md:w-auto"
                    onClick={() => router.replace("/teacher")}
                >
                    <MoveLeft className="w-4 h-4 mr-1" />
                    Regresar
                </Button>

                {/* Contenedor de acciones */}
                <div className="flex flex-col gap-2 w-full md:flex-row md:w-auto">
                    {isPublished ? (
                        <Button
                            onClick={() => onPublish(false)}
                            className="bg-violet-500 hover:bg-violet-400 hover:cursor-pointer transition-colors w-full md:w-auto"
                            disabled={isLoading}
                        >
                            Ocultar
                            <EyeOff className="w-4 h-4 ml-1" />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => onPublish(true)}
                            className="bg-emerald-500 hover:bg-emerald-400 hover:cursor-pointer transition-colors w-full md:w-auto"
                            disabled={isLoading}
                        >
                            Publicar
                            <Eye className="w-4 h-4 ml-1" />
                        </Button>
                    )}

                    <Button
                        onClick={onRemoveCourse}
                        className="bg-rose-500 hover:bg-red-400 hover:cursor-pointer transition-colors w-full md:w-auto"
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}