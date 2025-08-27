import { VideoCourseProps } from "./videoCourse.types";

export function VideoCourse(props: VideoCourseProps) {
    const { videoUrl } = props;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="aspect-video">
                <video 
                    src={videoUrl} 
                    controls
                    className="w-full h-full rounded-md shadow-md object-cover"
                />
            </div>
        </div>
    );
}
