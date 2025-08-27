import { Progress } from "@/components/ui/progress";
import { CourseListDisplayProps } from "./courseProgressDisplay.types";
import DownloadCertificate from "../download-certificate/DownloadCertificate";

export function CourseListDisplay(props: CourseListDisplayProps) {

    const { progress, titleCourse, userName } = props
    const showProgress = progress === 100

    return showProgress ? (
        <DownloadCertificate 
            userName={userName}
            titleCourse={titleCourse}
        />

    ) : (
        
        <>
            <Progress value={progress} className="[&>*]:bg-violet-400" />
            <p className=" text-xs">{progress}% Completado</p>
        </>
    )
}
