import React, { useContext } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { FileContext } from '../App'

function DocumentPreview(props) {
    const id = props.match.params.id
    const fileContext = useContext(FileContext)
    return (
        <div style={{ width: 595, height: 842 }}>
            <p><div dangerouslySetInnerHTML={{ __html: `<h1>${id}</h1>` }} /></p>
        </div>
    )

}

export default DocumentPreview;
