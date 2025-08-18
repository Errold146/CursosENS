"use client"

import axios from "axios";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ActionsProps } from "./actions.types";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Actions(props: ActionsProps) {

    const router = useRouter()
    const { courseId } = props

    const onEdit = () => {
        router.push(`/teacher/${courseId}`)
    }

    const onDeleteCourse = () => {
        axios.delete(`/api/course/${courseId}`)
        toast.success('Curso Eliminado Correctamente')
        router.refresh()
    }

    return (
        <div className="flex flex-col gap-2 items-center w-full lg:max-w-42">
            <Button 
                className="w-full bg-emerald-500 hover:bg-emerald-400 transition-colors"
                onClick={onEdit}
            >
                Editar <Edit className=" w-4 h-4" />
            </Button>

            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className=" w-full bg-red-500 hover:bg-red-400 transition-colors">
                        Eliminar <Trash className=" w-4 h-4" />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>¿Estas seguro que quieres eliminar?</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¡Un curso Eliminado no se podrá recuperar!
                            Está acción borrará el curso, el o los videos y todo sus datos.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Regresar</AlertDialogCancel>
                        <AlertDialogAction onClick={onDeleteCourse}>Eliminar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
