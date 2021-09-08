import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import getAllCompanyData from '../actions/companyActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import { Col, Row, Container } from 'react-bootstrap'

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
                    <Button onClick={buttonHandler}>
                        Logout
                    </Button>
                    <Col></Col>
                    <Col>
                        {/*  */}
                        <Container display="flex" justifycontent="center" alignitems="center">
                            <h1>{companyData.navBarTitle}</h1>
                            <h1>{companyData.pptWithDetails}</h1>
                            <object data={companyData.pptWithDetails} type="application/pptx">
                                <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vRMUgcYWESunp3Q6zPFKRRffv9zLysMw88QE6bqHZoecwWdkwt6s00ZnHfPW1sxwDlbIDQxO1Z7ECys/embed?start=false&loop=false&delayms=5000" frameborder="0" width="100%" height="900" allowFullScreen="true" mozAllowFullscreen="true" webkitAllowFullScreen="true"
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
