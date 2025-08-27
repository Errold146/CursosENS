import ChapterList from "./chapter-list/ChapterList";
import { ChaptersCourseProps } from "./chaptersCourse.types";

export function ChaptersCourse(props: ChaptersCourseProps) {

    const { chapterCourse, chapters, courseSlug, userProgress } = props 

    return (
        <div className=" bg-white p-4 rounded-lg shadow-md border border-gray-200 h-fit">
            <h2 className=" text-2xl font-semibold text-gray-800 mb-4">Capítulos</h2>

            <ChapterList 
                chapters={chapters}
                courseSlug={courseSlug}
                userProgress={userProgress}
                currentChapter={chapterCourse}
            />

        </div>
    )
}
