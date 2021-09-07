import React from 'react'
import { Container, Col } from 'react-bootstrap'
import Navbar from '../components/Header'

export default function BecomeVolunteerScreen() {
    return (
        <>
            <Navbar />
            <Col></Col>
            <Col>
                <Container display="flex" justifycontent="center" alignitems="center">
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfieELiT1Etd-Gzm0Hkfr10PGSbZbRtK0-Ro2aL-SopqocCZQ/viewform?embedded=true"
                        width="100%"
                        height="1039"
                        frameBorder="0"
                        marginHeight="0"
                        marginWidth="0"
                        title="Become A Voluteer"
                    >
                        Loading…</iframe>;
                </Container>
            </Col>
            <Col></Col>

        </>
    )

}

