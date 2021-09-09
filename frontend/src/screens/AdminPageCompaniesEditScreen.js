import React from 'react'
import { logout } from '../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import AdminPanelHeader from '../components/AdminPanelHeader'
import { Col, Row } from 'react-bootstrap'

const AdminPageCompaniesEditScreen = ({ history }) => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    if (!userInfo) {
        history.push('/login')
        dispatch(logout())
    } else {
        if (!userInfo.isAdmin && !userInfo.isSubAdmin) {
            history.push('/login')
            dispatch(logout())
        }
    }
    return (
        <Row>
            <Col md={2} xl={2} lg={2}>
                <AdminPanelHeader history={history} />
            </Col>
            <Col md={10} xl={10} lg={10}>
                <h1>Companies</h1>
            </Col>

        </Row>
    )
}

export default AdminPageCompaniesEditScreen
