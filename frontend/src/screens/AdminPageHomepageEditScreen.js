import React, { useEffect } from 'react'
import { logout } from '../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import AdminPanelHeader from '../components/AdminPanelHeader'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { homepageCardList } from '../actions/homepageCardActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import AdminPanelFooter from '../components/AdminPanelFooter'

const AdminPageHomepageEditScreen = ({ history }) => {
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const homepageCards = useSelector(state => state.homepageCards)
    const { loading = true, error, cards } = homepageCards

    useEffect(() => {
        dispatch(homepageCardList())
    }, [dispatch])

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
            <Col md={3} xl={2} lg={3}>
                <AdminPanelHeader history={history} />
            </Col>
            <Col md={9} xl={10} lg={9}>
                {loading ? <Loader /> : error ? <Message variant="danger" children={error} /> :
                    <>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th style={{ textAlign: "center" }}>ID</th>
                                    <th style={{ textAlign: "center" }}>Image</th>
                                    <th style={{ textAlign: "center" }}>Title</th>
                                    <th style={{ textAlign: "center" }}>Location</th>
                                    <th style={{ textAlign: "center" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cards.map((card) => (
                                    <tr key={card._id}>
                                        <td style={{ textAlign: "center" }}>{card._id}</td>
                                        <td style={{ textAlign: "center" }}><img src={card.coverPhoto} alt={card.title} style={{ height: "50px", width: "50px" }}></img></td>
                                        <td style={{ textAlign: "center" }}>{card.title}</td>
                                        <td style={{ textAlign: "center" }}>{card.Location}</td>
                                        <td style={{ textAlign: "center" }}><Button variant="info">Edit</Button>{` `}<Button variant="danger">Delete</Button></td>
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

export default AdminPageHomepageEditScreen

