import { BsCloudCheck } from "react-icons/bs"
import React from 'react'

const DocumentInput = () => {
    return (
        <div className='flex items-center gap-1'>
            <span className='text-lg px-1.5 cursor-pointer truncate'>Untitled Document</span>
            <BsCloudCheck />
        </div>
    )
}

export default DocumentInput
