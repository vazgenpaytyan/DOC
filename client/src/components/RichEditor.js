import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

function RichEditor() {


    return (
        <Editor
            initialValue="<p>This is the initial content of the editor</p>"
            //tinymceScriptSrc='tinymce.min.js'
            init={{

                height: 595,
                width: 842,
                save_enablewhendirty: true,
                plugins: [
                    'advlist save lists emoticons link image charmap print preview anchor',
                    'searchreplace visualblocks fullscreen',
                    'insertdatetime media table help wordcount style paste'
                ],
                paste_as_text: true,
                contextmenu: "undo redo emoticons copy cut preview",
                toolbar: [
                    'undo redo | advlist fullscreen save print preview  bullist numlist copy cut paste | outdent indent \
                    formatselect fontselect |\
                     ',
                    'italic bold underline striketrough superscript subscript striketrough\
                     removeformat | image table link unlink \
                     blockquote charmap anchor | backcolor forecolor emoticons | \
                     searchreplace wordcount visualblocks\
                     ',
                    'alignleft aligncenter alignright alignjustify | insertdatetime media | fontsizeselect\
                    style'
                ]
            }}
        />
    )

}

export default RichEditor;
