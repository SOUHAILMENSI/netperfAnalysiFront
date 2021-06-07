import React from "react";
import { getUser, removeUserSession } from "./Utils/Common";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Logo from "./imgs/ic_launcher_round.png";
import './resources/headers.css';

function Headers(props) {
  const user = getUser();


  const history = useHistory();
  const handleLogout = () => {
    removeUserSession();
    history.push("/login");
  };


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/qosdashboard">
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
          <Nav className="mr-auto ">
            <Nav.Link href="/qosdashboard" to="/qosdashboard">
              <i class="fas fa-chart-line fa-lg "></i> Radio Technology
            </Nav.Link>
            <Nav.Link
              href="/qoedashboard"
              activeclassNameName="active "
              to="/qoedashboard"
            >
              <i class="fas fa-chart-pie fa-lg"></i> Data Services
            </Nav.Link>
          </Nav>

          <span className="my-auto" > Welcome {user.name}  
          <i class="fas fa-sign-out-alt fa-lg" style={{marginLeft: "0.5rem"}} onClick={handleLogout}></i>
          </span> 

        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default Headers;
