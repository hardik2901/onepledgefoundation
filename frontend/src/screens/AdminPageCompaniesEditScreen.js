import React, { useEffect } from 'react'
import { logout } from '../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import AdminPanelHeader from '../components/AdminPanelHeader'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Button, Col, Row, Table } from 'react-bootstrap'
import AdminPanelFooter from '../components/AdminPanelFooter'
import { deleteCompany, getCompaniesData, getEditorsList } from '../actions/companyActions'

const AdminPageCompaniesEditScreen = ({ history }) => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const companiesData = useSelector((state) => state.companiesData)
    const { loading = true, error, companies } = companiesData

    const companyDelete = useSelector(state => state.companyDelete)
    const { loading: loadingDelete, error: errorDelete, data: successDelete } = companyDelete

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCompaniesData())
        if (successDelete) {
        }
    }, [successDelete, dispatch])

    if (!userInfo) {
        history.push('/login')
        dispatch(logout())
    } else {
        if (!userInfo.isAdmin && !userInfo.isSubAdmin) {
            history.push('/login')
            dispatch(logout())
        }
    }

    const editButtonHandler = (id) => {
        history.push(`/companies/${id}/edit`)
    }

    const deleteButtonHandler = (id) => {
        if (window.confirm('Are you sure? ...You want to delete the Company !!')) {
            dispatch(deleteCompany(id));
        }
    }


    return (
        <Row>
            <Col md={3} xl={2} lg={3}>
                <AdminPanelHeader history={history} />
            </Col>
            <Col md={9} xl={10} lg={9}>
                {loadingDelete && <Loader />}
                {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                {loading ? <Loader /> : error || errorDelete ? <Message variant="danger" children={error} /> :
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center" }}>ID</th>
                                    <th style={{ textAlign: "center" }}>UserName</th>
                                    <th style={{ textAlign: "center" }}>Title</th>
                                    <th style={{ textAlign: "center" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map((comp) => (
                                    <tr key={comp._id}>
                                        <td style={{ textAlign: "center" }}>{comp._id}</td>
                                        <td style={{ textAlign: "center" }}>{comp.userName}</td>
                                        <td style={{ textAlign: "center" }}>{comp.navBarTitle}</td>
                                        <td style={{ textAlign: "center" }}><Button variant="info" onClick={() => editButtonHandler(comp._id)}>Edit</Button>{` `}<Button variant="danger" onClick={() => deleteButtonHandler(comp._id)}>Delete</Button></td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                    </>
                }
            </Col>
            <AdminPanelFooter />
        </Row>
    )
}

export default AdminPageCompaniesEditScreen
