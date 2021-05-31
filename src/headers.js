import React from "react";
import { getUser, removeUserSession } from "./Utils/Common";
import { NavLink } from "react-router-dom";

import { useHistory } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
function Headers(props) {
  const user = getUser();

  const history = useHistory();
  const handleLogout = () => {
    removeUserSession();
    history.push("/login");
  };

  let url="";
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <NavLink exact activeClassName="active" to="/">
          <Navbar.Brand href="#">NetPerf</Navbar.Brand>
        </NavLink>

        <Nav className="mr-auto">
          <NavLink exact activeClassName="active" to="/">
            <Nav.Link href="#home">Home</Nav.Link>
          </NavLink>
          <NavLink activeClassName="active" to="/dashboard">
            <Nav.Link href="#features">Radio Technology</Nav.Link>
          </NavLink>

          <NavLink activeClassName="active" to="/dashboard2">
            <Nav.Link href="#pricing">Data Services</Nav.Link>
          </NavLink>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text onClick={handleLogout}>
            Signed in as: <a href={url}> {user.name} </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Headers;
