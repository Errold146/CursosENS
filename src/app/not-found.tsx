import Link from "next/link";
import { Ghost } from "lucide-react"; 
import { Button } from "@/components/ui/button";

export default function NotFound() {
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

            <Button asChild className="mt-6">
                <Link href="/">Regresar al Inicio</Link>
            </Button>
        </div>
    );
}
