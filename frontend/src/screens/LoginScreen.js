import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'


const LoginScreen = ({ history }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)

  const { loading, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo._id) {
      if ((userInfo.isAdmin || userInfo.isSubAdmin))
        history.push('/admin')
      else
        history.push(`/users/${userInfo._id}`)
    } else {
      setUserName("")
      setPassword("")
    }
  }, [history, userInfo])

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(login(userName, password));
  }

  return (
    <>
      <FormContainer>
        <h1>
          Login In
        </h1>
        {error && <Message children={error} variant="danger" />}
        {loading && <Loader />}
        <Form onSubmit={submitForm}>
          <Form.Group controlId='userName' className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control type='text' placeholder='Enter UserName' value={userName} onChange={(e) => setUserName(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          {/* <Button type="submit" variant="primary" className="mb-3">Login In</Button> */}
          <Button type="submit" variant="info">Login</Button>
        </Form>
      </FormContainer>
    </>

  )
}

export default LoginScreen

