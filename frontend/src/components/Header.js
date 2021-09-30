import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
import "../cssFiles/Footer.css"


const Header = () => {
    return (
        <Navbar variant="dark" className="color-navbar-homepage" expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Nav.Link>
                        <Navbar.Brand>one pledge foundation</Navbar.Brand>
                        <img src="/images/onePledgeFoundationLogo.png" className="navbar-logo-onepledge" alt="logo"></img>
                    </Nav.Link>

                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse className='justify-content-end' id='basic-navbar-nav'>
                    <Nav className='justify-content-end'>
                        <LinkContainer to='/'>
                            <Nav.Link>
                                Home
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/aboutus'>
                            <Nav.Link>
                                About Us
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/whatwedo'>
                            <Nav.Link>
                                What We Do
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to='/contactus'>
                            <Nav.Link>
                                Contact Us
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header