import Image from "next/image";
import { CertificateProps } from "./certificate.types";

export default function Certificate(props: CertificateProps) {
    const { userName, titleCourse, certRef } = props;

    return (
        <div
            ref={certRef}
            className="w-full h-[650px] bg-[url('/certificado.png')] bg-cover bg-center text-black relative"
        >
            <p
                className="absolute text-4xl tracking-wide font-semibold top-[52%] left-[25%] transform -translate-x-1/2"
            >
                {userName}
            </p>

            <p
                className="absolute font-semibold tracking-wide text-3xl top-[72%] left-[32%] transform -translate-x-1/2"
            >
                {titleCourse}
            </p>

            <Image 
                src={"/Fronty.png"}
                alt="Icono de la academia"
                width={60}
                height={60}
                priority
                className=" absolute top-[6%] left-[50%]"
            />

            <p className=" absolute text-xl bottom-15 left-70">
                {new Date().toLocaleDateString()}
            
            </p>
        </div>
    );
}