import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
                <p className="text-center md:text-left">
                    © {new Date().getFullYear()} {" "}
                    <span className="font-semibold text-slate-700">MicroWeb-cr</span> | Cursos ENS
                </p>

                <div className="flex flex-wrap justify-center md:justify-end gap-3">
                    <Link 
                        href="/privacy-policy" 
                        className="p-2 rounded-lg not-last-of-type:transition-colors hover:text-slate-700 hover:bg-gray-100"
                    >
                        Políticas de Privacidad
                    </Link>
                    <span className="hidden md:inline-block p-2">|</span>
                    <Link 
                        href="/terms" 
                        className="p-2 rounded-lg transition-colors hover:text-slate-700 hover:bg-gray-100"
                    >
                        Condiciones de Uso
                    </Link>
                </div>
            </div>
        </footer>
    );
}
