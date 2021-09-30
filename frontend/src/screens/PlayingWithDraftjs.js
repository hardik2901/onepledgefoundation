import React, { useState } from 'react';
import renderHTML from 'react-render-html';
import { Editor } from "@tinymce/tinymce-react";
import { Row, Col } from 'react-bootstrap'



function PlayingWithDraftjs() {
    const [html, setHtml] = useState("<h1>Hello world</h1>")
    const onChangeHandler = (e) => {
        if (e.target.getContent({ format: 'raw' }))
            setHtml(e.target.getContent({ format: 'raw' }))
        else
            setHtml("<h1>Hello world</h1>")
    }
    return (
        <>
            <Editor
                apiKey="6hbyflffurp09yo1gsm19r4untu281lk8kdr0vxkv7z2c8ll"
                id="hardik"
                onChange={onChangeHandler}
                init={{
                    data: "Hello world",
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image code fontsizeselect blockquote',
                        'charmap print preview anchor help',
                        'searchreplace visualblocks code color',
                        'insertdatetime media table paste wordcount'
                    ],
                    toolbar:
                        'undo redo table print|blockquote fontsizeselect fontselect forecolor backcolor| media preview image| searchreplace code formatselect | bold italic | alignleft aligncenter alignright | visualblocks | list bullist numlist outdent indent | help'
                }}
            />
            <Row>
                <Col md={2}>
                </Col>
                <Col md={8}>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </Col>
                <Col md={2}>
                </Col>
            </Row>

            {renderHTML('<p style="text-align: center;"><strong><span style="font-size: 18pt;">Update 1</span>:</strong> <span style="color: #e03e2d;">added TinyMCE config file:</span></p')}
        </>
    );
}

export default PlayingWithDraftjs;