import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import { Row } from 'react-bootstrap'
import AdminPanelHeader from '../components/AdminPanelHeader'
import { Editor } from "@tinymce/tinymce-react";
import { getEditorData } from '../actions/companyActions'
import { useLocation } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'

const AdminPageEditorEditScreen = ({ history }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const companyEditorData = useSelector((state) => state.companyEditorData)
    const { loading, error, data } = companyEditorData;

    const [html, setHtml] = useState("<h1>Start writing in the Editor/h1>")

    const dispatch = useDispatch()
    const location = useLocation().pathname;
    const compId = location.split('/')[2];
    const title = location.split('/')[3];

    useEffect(() => {
        dispatch(getEditorData(compId, title))
    }, [dispatch, compId, title])

    if (!userInfo) {
        history.push('/login')
        dispatch(logout())
    } else {
        if (!userInfo.isAdmin && !userInfo.isSubAdmin) {
            history.push('/login')
            dispatch(logout())
        }
    }

    const onChangeHandler = (e) => {
        if (e.target.getContent({ format: 'raw' }))
            setHtml(e.target.getContent({ format: 'raw' }))
        else
            setHtml("<h1>Hello world</h1>")
    }

    return (
        <Row>
            <span>
                <AdminPanelHeader history={history} />
            </span>
            {data && loading ? <Loader /> : error ? <Message variant="danger" children={error} /> :
                <>
                    <span style={{ marginLeft: "245px" }}>
                        <Editor
                            apiKey="6hbyflffurp09yo1gsm19r4untu281lk8kdr0vxkv7z2c8ll"
                            id="hardik"
                            autoresize_on_init={true}
                            onChange={onChangeHandler}
                            initialValue={data ? data.rawHtml : html}
                            init={{
                                height: "80vh",
                                width: "82%",
                                plugins: [
                                    'advlist autolink lists link image code fontsizeselect blockquote autoresize',
                                    'charmap print preview anchor help',
                                    'searchreplace visualblocks code color',
                                    'insertdatetime media table paste wordcount'
                                ],
                                toolbar:
                                    'undo redo table print| autoresize |blockquote fontsizeselect fontselect forecolor backcolor| media preview image| searchreplace code formatselect | bold italic | alignleft aligncenter alignright | visualblocks | list bullist numlist outdent indent | help'

                            }}
                        />
                    </span>
                </>
            }
        </Row>
    )
}

export default AdminPageEditorEditScreen
