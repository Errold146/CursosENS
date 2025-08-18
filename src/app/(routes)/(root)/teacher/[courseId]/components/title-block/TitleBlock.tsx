import { TitleBlockProps } from "./titleBlock.types";

export function TitleBlock(props: TitleBlockProps) {

    const { title, icon: Icon } = props

    return (
        <div className="flex items-center mb-6 gap-1">
            <div className="p-2 rounded-full bg-violet-400">
                <Icon className=" h-5 w-5 text-white" />
            </div>
            <h3 className=" text-xl font-semibold mx-2">{title}</h3>
        </div>
    )
}
