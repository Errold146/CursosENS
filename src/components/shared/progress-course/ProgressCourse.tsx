"use client"

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { ProgressCourseProps } from "./progressCourse.types";
import { getUserProgressCourse } from "@/actions/getUserProgressCourse";

export function ProgressCourse(props: ProgressCourseProps) {

    const { courseId, totalChapters, price } = props

    const { user } = useUser()
    const [progressCourse, setProgressCourse] = useState<number>(0)

    useEffect(() => {
        const fetchProgress = async () => {
            if ( user?.id ) {
                const progress = await getUserProgressCourse(courseId, user?.id)
                setProgressCourse(progress)
            }
        }

        fetchProgress()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id])
    

    if ( !user ) { 
        return <p className=" text-xs mt-2">No has iniciado sesión</p>
    }

    return (
        <div className=" mt-4">
            {totalChapters > 0 && progressCourse > 0 ? (
                <div>
                    <Progress 
                        value={progressCourse} 
                        className="[&>*]:bg-emerald-400"   
                    />
                    <p className=" text-xs mt-1">{progressCourse}% Completado</p>
                </div>
            ): (
                <h4>{formatCurrency(price!)}</h4>
            )}
        </div>
    )
}
