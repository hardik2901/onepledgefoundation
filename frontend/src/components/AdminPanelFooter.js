import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const AdminPanelFooter = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; one pledge foundation</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default AdminPanelFooter
