import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AdminPanelHeader from '../components/AdminPanelHeader'
import { logout } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Row, Col, Table, Button } from 'react-bootstrap'
import { deleteEditor, getEditorData, getEditorsList } from '../actions/companyActions'
import { useLocation, Link } from 'react-router-dom'

const AdminPageCompaniesFieldEditScreen = ({ history }) => {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const companyEditorList = useSelector((state) => state.companyEditorList)
    const { error, editors, loading = true } = companyEditorList;

    const companyEditorDelete = useSelector((state) => state.companyEditorDelete)
    const { error: errorDelete, status, loading: deleteLoading } = companyEditorDelete

    const dispatch = useDispatch();


    if (!userInfo) {
        history.push('/login')
        dispatch(logout())
    } else {
        if (!userInfo.isAdmin && !userInfo.isSubAdmin) {
            history.push('/login')
            dispatch(logout())
        }
    }
    const location = useLocation().pathname
    const compId = location.split('/')[2];
    useEffect(() => {
        if (!editors)
            dispatch(getEditorsList(compId))
        if (status) {
            window.location.reload();
        }
    }, [status, editors, compId, dispatch])

    const deleteButtonHandler = (title) => {
        dispatch(deleteEditor(compId, title));
    }

    const editButtonHandler = (title) => {
        dispatch(getEditorData(compId, title))
    }


    return (
        <>
            {errorDelete && <Message variant="danger" children={errorDelete} />}
            {deleteLoading && <Loader />}
            {loading ? <Loader /> : error ? <Message variant="danger" children={error} /> :
                <Row>
                    <Col md={4} xl={2} lg={3}>
                        <AdminPanelHeader history={history} />
                    </Col>
                    <Col md={8} xl={10} lg={9}>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center" }}>ID</th>
                                    <th style={{ textAlign: "center" }}>Title</th>
                                    <th style={{ textAlign: "center" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {editors.map((editor) => (
                                    <tr key={editor._id}>
                                        <td style={{ textAlign: "center" }}>{editor._id}</td>
                                        <td style={{ textAlign: "center" }}>{editor.title}</td>
                                        <td style={{ textAlign: "center" }}><Link to={`/companies/${compId}/${editor.title}/edit`}><Button variant="info" onClick={() => editButtonHandler(editor.title)}> Edit</Button></Link>{` `}<Button variant="danger" onClick={() => deleteButtonHandler(editor.title)}>Delete</Button></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            }
        </>
    )
}

export default AdminPageCompaniesFieldEditScreen
