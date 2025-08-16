import { SignIn } from "@clerk/nextjs";

export default function SingInPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            <h1 className=" font-semibold text-4xl" >Bienvenido! 👋🏼 </h1>
            <p className=" text-xl">Inicie sesión para continuar con su cuenta</p>

            <SignIn />
        </div>
    )
}
