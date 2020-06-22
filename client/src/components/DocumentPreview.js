import React, { useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { FileContext } from '../App'

function DocumentPreview({ file }) {
    const fileContext = useContext(FileContext)
    return (
        <div>
            <p><div dangerouslySetInnerHTML={{ __html: file }} /></p>
        </div>
    )

}

export default DocumentPreview;
