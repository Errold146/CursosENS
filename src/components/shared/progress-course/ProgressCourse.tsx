"use client"

import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { ProgressCourseProps } from "./progressCourse.types";

export function ProgressCourse(props: ProgressCourseProps) {

    const { courseId, totalChapters, price } = props

    const { user } = useUser()
    const [progressCourse, setProgressCourse] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchProgress = async () => {
            if ( !user?.id ) return setLoading(false);

            try {
                const {data} = await axios.post("/api/get-user-progress", {
                    courseId,
                    userId: user.id
                })

                setProgressCourse(data.progress)

            } catch (error) {
                console.error(error)

            } finally {
                setLoading(false)
            }
        }

        fetchProgress()

    }, [courseId, user?.id])
    

    if ( !user ) { 
        return <p className=" text-xs mt-2">No has iniciado sesión</p>
    }

    if ( loading ) return <p className=" text-xs mt-2">Cargando proceso...</p>

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
