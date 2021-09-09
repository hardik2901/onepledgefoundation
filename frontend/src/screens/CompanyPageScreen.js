import React, { useEffect } from 'react'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import getAllCompanyData from '../actions/companyActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Col, Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap'

const CompanyPageScreen = ({ history }) => {
    const dispatch = useDispatch()

    const buttonHandler = () => {
        dispatch(logout())
    }
    const { id } = useParams();
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const companyPageData = useSelector((state) => state.companyPageData);
    const { error, loading = true, companyData } = companyPageData;

    useEffect(() => {
        if (userInfo) {
            if (!companyData) {
                dispatch(getAllCompanyData(id));
            }
        }
    }, [dispatch, userInfo, companyData, history, id])

    return (
        <>
            {loading ? <Loader /> : error ? <Message variant="danger" children={error} /> :
                <>
                    <Navbar variant='dark' bg="dark" expand='lg' collapseOnSelect>
                        <Container>
                            <LinkContainer to='/'>
                                <Nav.Link>
                                    <Navbar.Brand>{companyData.navBarTitle}</Navbar.Brand>
                                    in assciation with <Navbar.Brand>one pledge foundation </Navbar.Brand>
                                    <img src="/images/onePledgeFoundationLogo.png" className="navbar-logo-onepledge" alt="logo"></img>
                                </Nav.Link>

                            </LinkContainer>
                            <Navbar.Toggle aria-controls='basic-navbar-nav' />
                            <Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
                                <Nav className='justify-content-end'>
                                    <NavDropdown title={companyData.userName} id="basic-nav-dropdown">
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
                    <Col></Col>
                    <Col>
                        {/*  */}
                        <Container display="flex" justifycontent="center" alignitems="center">
                            <h1>{companyData.navBarTitle}</h1>
                            <h1>{companyData.pptWithDetails}</h1>
                            <object data={companyData.pptWithDetails} type="application/pptx">
                                <iframe src={companyData.pptWithDetails} frameborder="0" width="100%" height="900" allowFullScreen="true" mozAllowFullscreen="true" webkitAllowFullScreen="true"
                                    marginHeight="0"
                                    marginWidth="0"
                                    title="Become A Voluteer"
                                >
                                    Loading…</iframe>;
                            </object>
                        </Container>
                    </Col>
                    <Col></Col>
                </>


            }
        </>


    )
}

export default CompanyPageScreen
