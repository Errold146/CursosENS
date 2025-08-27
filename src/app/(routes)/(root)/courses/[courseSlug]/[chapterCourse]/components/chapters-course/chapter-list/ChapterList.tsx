import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { ChapterListProps } from "./chapterList.types";

export default function ChapterList(props: ChapterListProps) {

    const { chapters, courseSlug, currentChapter, userProgress } = props

    if ( !chapters ) return null;

    return (
        <div className="grid gap-4">
            {chapters.map( chap => {

                const isCurrent = chap.id === currentChapter
                const isCompleted = userProgress?.some( pro => pro.chapterId === chap.id && pro.isCompleted)

                return (
                    <Link 
                        key={chap.id}
                        href={`/courses/${courseSlug}/${chap.id}`}
                        className={` flex items-center justify-between border-gray-200 rounded-md transition-all duration-300 
                            ${isCurrent ? ' bg-violet-200 shadow-lg shadow-violet-300' : ' hover:bg-violet-200 hover:shadow-lg'}
                        `}
                    >
                        <div className=" flex items-center gap-2 border shadow-md w-full justify-between rounded-md p-2">
                            <span>{chap.title}</span>
                            {isCompleted ? (
                                <Eye className=" w-5 h-5" />
                            ): (
                                <EyeOff className=" w-5 h-5" />
                            )}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
