import React, { useEffect } from 'react'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { getEditorsList } from '../actions/companyActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Row, Col, Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap'

const CompanyPageScreen = ({ history }) => {
    const dispatch = useDispatch()

    const buttonHandler = () => {
        dispatch(logout())
    }
    const { id } = useParams();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const companyEditorList = useSelector((state) => state.companyEditorList);
    const { error, loading = true, editors } = companyEditorList;
    useEffect(() => {
        if (!editors) {
            dispatch(getEditorsList(id))
        }
    }, [dispatch, userInfo, editors, history, id])

    return (
        <>
            {loading ? <Loader /> : error ? <Message variant="danger" children={error} /> :
                <>
                    <Navbar variant='dark' bg="dark" expand='lg' collapseOnSelect>
                        <Container>
                            <LinkContainer to='/'>
                                <Nav.Link>
                                    <Navbar.Brand>One Pledge Foundation</Navbar.Brand>
                                    <img src="/images/onePledgeFoundationLogo.png" className="navbar-logo-onepledge" alt="logo"></img>
                                </Nav.Link>

                            </LinkContainer>
                            <Navbar.Toggle aria-controls='basic-navbar-nav' />
                            <Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
                                <Nav className='justify-content-end'>
                                    {editors.map((editor) => (
                                        <Nav.Link key={editor._id} href={`#${editor.title}`}>{editor.title}</Nav.Link>
                                    ))}
                                    <NavDropdown title="JMS" id="basic-nav-dropdown">
                                        <div className="d-grid gap-2">
                                            <Button onClick={buttonHandler} variant="info" size="lg">
                                                Logout
                                            </Button>
                                        </div>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    {/*  */}
                    <Row>
                        <Col lg={2} xl={2}>
                        </Col>
                        <Col lg={8} xl={8}>
                            <Container display="flex" justifycontent="center" alignitems="center">
                                {editors.map((editor) => (
                                    <div key={editor._id} >
                                        <a name={`${editor.title}`}> </a>
                                        <div className="d-grid gap-2" style={{ padding: "10px" }}>
                                            <Button variant="primary" size="lg">
                                                {editor.title}
                                            </Button>
                                        </div>

                                        <div dangerouslySetInnerHTML={{ __html: editor.rawHtml }} />
                                    </div>
                                ))
                                }
                            </Container>
                        </Col >
                        <Col lg={2} xl={2}>
                        </Col>
                    </Row>
                </>


            }
        </>


    )
}

export default CompanyPageScreen
