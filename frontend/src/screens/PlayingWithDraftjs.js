import React, { useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DOMPurify from "dompurify";



const PlayingWithDraftjs = () => {
    const [ckeditor, setCkEditor] = useState("")
    const cleanHTML = DOMPurify.sanitize(ckeditor, {
        USE_PROFILES: { html: true },
    });
    return (
        <>
            <h2>Using CKEditor 5 build in React</h2>
            <CKEditor
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setCkEditor(data);
                }}
                onBlur={(event, editor) => {
                    const data = editor.getData();
                    setCkEditor(data);
                }}
                onFocus={(event, editor) => {
                    const data = editor.getData();
                    setCkEditor(data);
                }}
            />
            <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />
        </>
    )
}

export default PlayingWithDraftjs
