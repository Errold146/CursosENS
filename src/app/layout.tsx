import { Metadata } from "next"
import { ClerkProvider } from '@clerk/nextjs'
import { Space_Grotesk } from "next/font/google"

import "./globals.css"
import { Footer, NavBar } from "@/components/shared"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./(routes)/(root)/components"
import { Toaster } from "@/components/ui/sonner"

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Cursos ENS",
    description: "Sitio de cursos en linea.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang="es">
                <body className={`${spaceGrotesk.className} antialiased`}>
                    <SidebarProvider>
                        <AppSidebar />
                        <div className=" w-full bg-stone-100 flex flex-col min-h-screen">
                            <NavBar />
                            
                            <main className=" flex-1">
                                {children}
                            </main>

                            <Toaster richColors position="bottom-right" />

                            <Footer />
                        </div>
                    </SidebarProvider>
                </body>
            </html>
        </ClerkProvider>
    )
}