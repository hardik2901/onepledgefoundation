import React from 'react'
import { Row, Col } from 'react-bootstrap'
import AdminPanelHeader from '../components/AdminPanelHeader'

const AdminPageHomepageAddCardScreen = ({ history }) => {
    return (
        <div>
            <Row>
                <Col md={3} xl={2} lg={3}>
                    <AdminPanelHeader history={history} />
                </Col>
                <Col md={9} xl={10} lg={9}>
                    Add card Screen
                </Col>
            </Row>
        </div>
    )
}

export default AdminPageHomepageAddCardScreen
