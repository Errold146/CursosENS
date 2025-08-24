"use client"

import { useMemo } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"

export type EditorDescriptionProps = {
    value: string
    onChange: (value: string) => void
}

export const EditorDescription = (props: EditorDescriptionProps) => {

    const { value, onChange } = props

    const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), { ssr: false}), [])

    return <ReactQuill theme="snow" value={value} onChange={onChange} />
}
