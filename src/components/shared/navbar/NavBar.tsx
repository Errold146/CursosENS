"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { BellRing, LogIn, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function NavBar() {
    return (
        <div className="flex justify-between p-4 border-b border-gray-200 dark:border-white/10 bg-white h-16">
            <SidebarTrigger />

            <div className="flex gap-4 items-center">
                <div className="flex w-full max-w-sm items-center border-slate-300 rounded-lg px-2.5 py-0.5">
                    <Search className="h-5 w-5 mr-2.5" />
                    <Input type="search" placeholder="Buscar..." className="w-full border-0" />
                </div>

                <Button variant="outline" className=" border-gray-300 cursor-pointer">
                    <BellRing />
                </Button>

                <SignedOut>
                    <SignInButton>
                        <Button
                            className=" bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer"
                        >
                            <LogIn />
                            <span>Iniciar Sesión</span>
                        </Button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}
