import { Metadata } from "next"
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import { getCourseBySlug } from "@/actions/getCourseBySlug";
import { getPurchaseCourseById } from "@/actions/getPurchaseCourseById";
import { BreadCrumbCourse, CourseContent, HeroBlock } from "./components";

export async function generateMetadata(
    { params }: { params: Promise<{ courseSlug: string }> }
): Promise<Metadata> {
    const { courseSlug } = await params;
    return {
        title: `Curso: ${courseSlug}`,
        description: `Estás viendo el curso "${courseSlug}"`,
    };
}

export default async function CourseSlugPage(
    { params }: { params: Promise<{ courseSlug: string }> }
) {

    const { courseSlug } = await params
    const infoCourse = await getCourseBySlug(courseSlug)

    if ( !infoCourse ) return notFound();

    const { title, id, chapters } = infoCourse

    const user = await currentUser()
    if ( !user ) redirect("/")

    const purchaseCourse = await getPurchaseCourseById(user.id, id)

    return (
        <div className=" max-w-6xl mx-auto">
            <div className=" my-4 mx-6 border border-gray-200 rounded-md bg-white p-6">
                
                {/* Breadcrumbs */}
                <BreadCrumbCourse title={title} />

                {/* Hero Block */}
                <HeroBlock course={infoCourse} purchaseCourse={purchaseCourse} />

            </div>

            {/* Course Content */}
            <div className=" my-4 mx-6 border border-gray-200 rounded-md bg-white p-6">
                <CourseContent chapters={chapters} />
            </div>
        </div>
    );
}
