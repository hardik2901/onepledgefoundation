import React from 'react'
import { Button } from 'react-bootstrap'
import { logout } from '../actions/userActions'
import { useDispatch } from 'react-redux'

const AdminPanelScreen = () => {

    const dispatch = useDispatch()
    const buttonHandler = () => {
        dispatch(logout())
    }
    return (
        <div>
            <h1>Admin Panel Screen</h1>
            <Button onClick={buttonHandler}> Logout</Button>
        </div>
    )
}

export default AdminPanelScreen
