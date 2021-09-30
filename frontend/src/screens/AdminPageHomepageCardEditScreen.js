import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import AdminPanelHeader from '../components/AdminPanelHeader'
import { useSelector, useDispatch } from 'react-redux'
import { editHomepageCard, singleHomepageCard } from '../actions/homepageCardActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

const AdminPageHomepageCardEditScreen = ({ match, history }) => {

    const cardId = match.params.id

    const [title, setTitle] = useState("")
    const [discription, setDiscription] = useState("")
    const [coverPhoto, setCoverPhoto] = useState({})
    const [Location, setLocation] = useState("")
    const [uploading, setUploading] = useState(false)
    const dispatch = useDispatch()

    const getCardDetails = useSelector(state => state.homepageCard)
    const { loading, card, error } = getCardDetails;

    const getUpdateDetails = useSelector(state => state.homepageCardEdit)
    let { loading: editLoading, error: editError, success = false } = getUpdateDetails;

    useEffect(() => {
        if (success) {
            <Redirect to="/homepage" />
        }
        if (!card || cardId !== card._id) {
            dispatch(singleHomepageCard(cardId));
        } else {
            setTitle(card.title)
            setCoverPhoto(card.coverPhoto)
            setLocation(card.Location)
            setDiscription(card.discription)
        }
    }, [card, cardId, success, history, dispatch])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('coverPhoto', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setCoverPhoto(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }

    }

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(
            editHomepageCard({
                title,
                discription,
                coverPhoto,
                Location
            }, cardId)
        )
    }
    return (
        <div>
            <Row>
                <Col md={3} xl={3} lg={4}>
                    <AdminPanelHeader history={history} />
                </Col>
                <Col md={9} xl={9} lg={8}>
                    {loading ? <Loader /> : error ? <Message variant="danger" childer={error} /> :
                        <>
                            {success && <Link to="/homepage"><Message variant="success" children={`Update Successful go back to home page`} /> </Link>}
                            {editLoading && <Loader />}
                            {editError && <Message variant="danger" children={editError} />}
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='title'>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter Title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='discription'>
                                    <Form.Label>Discription</Form.Label>
                                    <Form.Control
                                        type='discription'
                                        placeholder='Discription'
                                        value={discription}
                                        onChange={(e) => setDiscription(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='coverPhoto'>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter image url'
                                        value={coverPhoto}
                                        onChange={(e) => setCoverPhoto(e.target.value)}
                                    ></Form.Control>
                                    <Form.File
                                        id='coverPhoto'
                                        label='Choose File'
                                        custom
                                        onChange={uploadFileHandler}
                                    ></Form.File>
                                    {uploading && <Loader />}
                                </Form.Group>

                                <Form.Group controlId='Location'>
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Location'
                                        value={Location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    ></Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='info'> Update </Button>
                            </Form>

                        </>

                    }
                    Add card Screen
                </Col>
            </Row>
        </div>
    )
}

export default AdminPageHomepageCardEditScreen

