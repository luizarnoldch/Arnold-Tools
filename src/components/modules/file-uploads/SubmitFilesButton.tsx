'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { uploadImagesAction } from '@/actions/uploadImages'

type Props = {
  files: File[]
}

export default function SubmitFilesButton({ files }: Props) {
  const [isPending, startTransition] = useTransition()
  const handleSubmit = () => {
    if (files.length === 0) return

    const formData = new FormData()
    files.forEach((file) => formData.append('images', file))

    startTransition(async () => {
      try {
        const result = await uploadImagesAction(formData)
        console.log('Images uploaded:', result)
        // Aquí puedes mostrar feedback o limpiar el estado
      } catch (error) {
        console.error('Error uploading files:', error)
      }
    })
  }

  return (
    <Button onClick={handleSubmit} disabled={isPending || files.length === 0}>
      {isPending ? 'Subiendo...' : 'Subir Imágenes'}
    </Button>
  )
}
