import { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { ChaptersCourse, InfoCourse } from "./components";
import { getCourseBySlug } from "@/actions/getCourseBySlug";
import { getUserProgress } from "@/actions/getUserProgress";
import { getPurchasedCourse } from "@/actions/getPurchasedCourse";

export const metadata: Metadata = {
    title: "Estudia tu curso | CursosENS",
    description: "Visualiza los capítulos, videos y tu progreso en el curso seleccionado."
};


export default async function ChapterCoursePage(
    {params}: {params: Promise<{ courseSlug: string, chapterCourse: string }>}
) {

    const { courseSlug, chapterCourse } = await params

    const user = await currentUser()
    if ( !user ) return redirect('/');

    const infoCourse = await getCourseBySlug(courseSlug)
    const userProgress = await getUserProgress()

    if ( !infoCourse ) return redirect(`/courses/${courseSlug}`);

    const isPurchaseCourse = await getPurchasedCourse(user.id, infoCourse.id)
    const videoUrl = infoCourse.chapters.find(chapter => chapter.id === chapterCourse)?.videoUrl

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-[65%_1fr] gap-4">
                <InfoCourse 
                    infoCourse={infoCourse}
                    chapterCourseId={chapterCourse}
                    userProgress={userProgress}
                    purchaseCourse={isPurchaseCourse}
                    videoUrl={videoUrl}
                />
                
                <div>
                    <ChaptersCourse
                        chapterCourse={chapterCourse}
                        chapters={infoCourse.chapters}
                        courseSlug={courseSlug}
                        userProgress={userProgress}
                    />
                </div>
            </div>
        </div>
    )
}
