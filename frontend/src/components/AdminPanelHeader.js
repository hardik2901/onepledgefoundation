import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SubMenu
} from "react-pro-sidebar";

import 'react-pro-sidebar/dist/css/styles.css';
import { logout } from "../actions/userActions";


export default function AdminPanelHeader({ history }) {
    const dispatch = useDispatch()
    const headerStyle = {
        height: "100%",
        position: "fixed",
        textTransform: "uppercase",
        fontWeight: "bold",
        letterSpacing: "1px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "noWrap",
    };

    const logoStyle = {
        padding: "24px",
        textTransform: "uppercase",
        fontWeight: "bold",
        letterSpacing: "1px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "noWrap"
    };

    const logoutButtonHandler = () => {
        dispatch(logout());
    }

    return (
        <ProSidebar style={headerStyle}>
            <SidebarHeader style={logoStyle}>one plede foundation</SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem ><Link to="/homepage">Homepage</Link></MenuItem>
                    <MenuItem><Link to="companies">Companies</Link></MenuItem>
                    <SubMenu title="Add New">
                        <MenuItem><Link to="addnew">Homepage Card</Link></MenuItem>
                        <MenuItem>Company </MenuItem>
                    </SubMenu>
                </Menu>

            </SidebarContent>
            <SidebarFooter style={logoStyle}>
                <div className="d-grid gap-2">
                    <Button onClick={logoutButtonHandler} variant="info" size="lg">
                        Logout
                    </Button>
                </div>
            </SidebarFooter>
        </ProSidebar>
    );
}
