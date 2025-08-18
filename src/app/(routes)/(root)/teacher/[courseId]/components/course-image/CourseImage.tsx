"use client"

import Image from 'next/image'
import { toast } from 'sonner'
import { useState } from 'react'
import { FileImage, Pencil } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { UploadButton } from '@/utils/uploadthing'
import { CourseImageProps } from './courseImage.types'
import { TitleBlock } from '../title-block/TitleBlock'
import axios from 'axios'

export function CourseImage(props: CourseImageProps) {

    const { idCourse, imageCourse } = props
    const [isEditing, setIsEditing] = useState(false)
    const [image, setImage] = useState(imageCourse)

    const onChangeImage = async (imageUrl: string) => {
        try {
            await axios.patch(`/api/course/${idCourse}`, { imageUrl })
            toast.success('Imagen Editada Correctamente')
        } catch {
            toast.error('Ocurrio un error, recargue e intente de nuevo')
        }
    }

    return (
        <div className='p-4 rounded-lg bg-white h-full'>
            <TitleBlock title='Imagen del curso' icon={FileImage} />
            
            {isEditing ? (
                <div className=' bg-slate-300 p-4 mt-2 rounded-lg'>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={res => {
                            onChangeImage(res[0]?.ufsUrl)
                            setImage(res[0]?.ufsUrl)
                            setIsEditing(false)
                        }}
                        onUploadError={() => {
                            toast.error('Ocurrio un error, recargue e intente de nuevo')
                        }}
                    />
                </div>
            ) : (
                <div className='flex items-center justify-center'>
                    <Image 
                        src={image || '/no-photo.png'}
                        alt='Imagen del curso'
                        className='  rounded-md'
                        width={200}
                        height={100}
                        priority
                    />
                </div>
            )}

            <Button
                onClick={() => setIsEditing(!isEditing)}
                className=' bg-emerald-500 hover:bg-emerald-400 hover:cursor-pointer mt-2 transition-colors md:w-auto w-full'
            >
                <Pencil className=' w-4 h-4' />
                Editar Imagen
            </Button>
        </div>
    )
}
