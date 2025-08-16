
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=" w-full h-screen">
            <div className="flex items-center justify-center h-full w-full">
                <div className=" absolute top-0 left-0 h-full w-full bg-gradient-to-r from-amber-200 to-yellow-400 z-[-1]" />
                {children}
            </div>
        </div>
    )
}
