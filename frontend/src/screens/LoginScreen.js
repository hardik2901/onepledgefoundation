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
      <h1>
        Login In
      </h1>
      {error && <Message children={error} variant="danger" />}
      {loading && <Loader />}
      <Form onSubmit={submitForm} className="container">
        <img src="https://res.cloudinary.com/dejzo3x6l/image/upload/v1462601844/login%20page%20design/3.png" alt="Profile-pic" />
        <Form.Group controlId='userName' className="input_box">
          <Form.Label>User Name</Form.Label>
          <Form.Control type='text' placeholder='Enter UserName' value={userName} onChange={(e) => setUserName(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='password' className="input_box">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
        </Form.Group>
        {/* <Button type="submit" variant="primary" className="mb-3">Login In</Button> */}
        <Button type="submit" className="submit_btn" variant="info">Login</Button>
      </Form>
    </>

  )
}
/*
<div class="container">
    <form>
      <img src="https://res.cloudinary.com/dejzo3x6l/image/upload/v1462601844/login%20page%20design/3.png" alt="Profile-pic">
      <div class="input_box">
        <input type="text" name="username" placeholder="User Name">
      </div>
      <div class="input_box">
        <input type="password" name="password" placeholder="Password">
      </div>
      <input type="submit" name="submit" value="Login" class="submit_btn">
      <br><a href="#" class="for_pass">Forgot Password</a>
    </form>
  </div> 
  */

export default LoginScreen

