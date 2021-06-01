import React from "react";
import { getUser, removeUserSession } from "./Utils/Common";
import {
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Logo from "./imgs/ic_launcher_round.png";

function Headers(props) {
  const user = getUser();

  const history = useHistory();
  const handleLogout = () => {
    removeUserSession();
    history.push("/login");
  };

  let url = "";

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/qosDashboard">
          <img
            alt=""
            src={Logo}
            width="30"
            height="30"
            classNameName="d-inline-block align-top"
          />{" "}
          NetPerf Analytics
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="/qosdashboard"
              activeclassNameName="active"
              to="/qosdashboard"
            >
              Radio Technology
            </Nav.Link>
            <Nav.Link
              href="/qoedashboard"
              activeclassNameName="active"
              to="/qoedashboard"
            >
              Data Services
            </Nav.Link>
          </Nav>
          
            <NavDropdown title={user.name} id="basic-nav-dropdown">
              <NavDropdown.Item href={url} onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
         
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Headers;
