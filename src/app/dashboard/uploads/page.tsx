import FileUploadMultipleImages from '@/components/modules/file-uploads/FileUploads'
import React from 'react'

type Props = {}

const DashboardUploadsPage = (props: Props) => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-1/2 h-1/2'> 
        <FileUploadMultipleImages />
      </div>
    </div>
  )
}

export default DashboardUploadsPage
