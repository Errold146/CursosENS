import { Plus } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FormCreateCourse } from "../form-create-course/FormCreateCourse"

export function Header() {
    return (
        <div className=" my-4 mx-6 border border-gray-300 rounded-lg bg-white">
            <div className="flex justify-between items-center py-4 px-6">
                <h1 className=" text-2xl">Modo Profesor</h1>

                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            className=" bg-violet-500 hover:bg-violet-400 transition-colors cursor-pointer"
                        >
                            <Plus />
                            Crear Curso
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Crea tu curso</DialogTitle>
                            <FormCreateCourse />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
