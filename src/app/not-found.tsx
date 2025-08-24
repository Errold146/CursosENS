"use client"

import { useRouter } from "next/navigation";
import { ArrowLeft, Ghost } from "lucide-react"; 

import { Button } from "@/components/ui/button";

export default function NotFound() {

    const router = useRouter()

    return (
        <div className="flex flex-col items-center justify-center h-screen px-6 text-center bg-gray-100 dark:bg-slate-950">
            <div className="flex items-center gap-2 text-slate-400 dark:text-slate-600 mb-4">
                <Ghost className="w-6 h-6 animate-bounce" />
                <span className="text-lg font-semibold uppercase tracking-wide">Error 404</span>
            </div>

            <h1 className="text-5xl font-extrabold text-slate-800 dark:text-white">Página no encontrada</h1>
            <p className="text-base text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                La página que estás buscando no existe o fue movida. Verifica la URL o regresa al inicio.
            </p>

            <Button 
                onClick={() => router.back()} 
                className="mt-6 bg-violet-500 hover:bg-violet-400 transition-colors"
            >
                <ArrowLeft className=" w-5 h-5" />
                Regresar
            </Button>
        </div>
    );
}