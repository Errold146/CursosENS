"use client"

import { useRef } from "react";
import html2canvas from "html2canvas-pro";
import { Download, CircleSlash2 } from "lucide-react";

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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DownloadCertificateProps } from "./downloadCertificate.types";
import Certificate from "../certificate/Certificate";

export default function DownloadCertificate(props: DownloadCertificateProps) {

    const { userName, titleCourse } = props
    const certRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        
        if ( !certRef.current ) return;

        const canvas = await html2canvas(certRef.current, { scale: 1 })

        const link = document.createElement("a")
        link.download = `certificado-${titleCourse}.png`
        link.href = canvas.toDataURL("image/png")
        link.click()
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    className=" bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                    <Download className=" w-5 h-5" />
                    Descargar Certificado
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className=" w-full !max-w-[900px]">
                <AlertDialogHeader>
                    <AlertDialogTitle>Descarga tu certificado</AlertDialogTitle>
                    <AlertDialogDescription asChild>
                        <Certificate 
                            userName={userName}
                            titleCourse={titleCourse}
                            certRef={certRef}
                        />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className=" bg-violet-500 hover:bg-violet-400 transition-colors cursor-pointer border-none"
                    >
                        <CircleSlash2 className=" w-5 h-5" />
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDownload}
                        className=" bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer"
                    >
                        <Download className=" w-5 h-5" />
                        Descargar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
