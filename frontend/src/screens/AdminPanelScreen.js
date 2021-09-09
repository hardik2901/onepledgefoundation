import React from 'react'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import AdminPanelHeader from '../components/AdminPanelHeader'
import { Col, Row } from 'react-bootstrap'

const AdminPanelScreen = ({ history }) => {

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
        <div>
            <Row>
                <Col md={2} xl={2} lg={2}>
                    <AdminPanelHeader history={history} />
                </Col>
                <Col md={10} xl={10} lg={10}>
                    <h1>Admin Panel Screen</h1>
                </Col>

            </Row>



        </div>
    )
}

export default AdminPanelScreen
