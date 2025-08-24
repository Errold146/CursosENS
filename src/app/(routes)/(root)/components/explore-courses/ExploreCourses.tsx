"use client"

import { useRouter } from "next/navigation";
import { HandHeart, NotebookTabs, TvMinimalPlay } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function ExploreCourses() {
    const router = useRouter();

    return (
        <div className="my-6 mx-6 border border-gray-200 bg-white rounded-xl ">
            <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-6 items-center">
                <div className="p-8 flex flex-col gap-5">
                    <h1 className="text-4xl font-bold flex items-center gap-2">
                        <NotebookTabs className="w-10 h-10" />
                        Explora todos los cursos
                    </h1>

                    <div className="flex items-start gap-3 text-lg text-gray-700 leading-relaxed max-w-2xl">
                        <HandHeart className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                        <p>
                        ¿Listo para transformar tu futuro? Nuestros cursos están diseñados para llevarte desde cero hasta experto, sin necesidad de experiencia previa. Aprende a tu ritmo, desde donde estés, y con el apoyo de una comunidad apasionada. 💡 ¡Este es tu primer paso hacia algo grande!
                        </p>
                    </div>

                    <Button
                        className="bg-violet-500 hover:bg-violet-400 text-white text-md px-6 py-3 w-fit transition-all duration-300 flex items-center gap-2 rounded-lg shadow-sm"
                        onClick={() => router.push("/courses")}
                    >
                        <TvMinimalPlay className="w-5 h-5" />
                        Empezar a Aprender
                    </Button>
                </div>

                <div className="flex items-end">
                    <Image
                        src="/img-home.png"
                        alt="Image Coffee Mug"
                        width={300}
                        height={200}
                        priority
                    />
                </div>
            </div>
        </div>
    );
}
