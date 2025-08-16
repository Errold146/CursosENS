import { currentUser } from "@clerk/nextjs/server"
import { Header } from "./components"
import prisma from "@/lib/prisma"

export default async function TeacherPage() {

    const user = await currentUser()
    if ( !user ) return;

    const course = prisma.course.findMany({ where: { userId: user.id } })
    console.log(course)

    return (
        <div>
            <Header />
        </div>
    )
}
