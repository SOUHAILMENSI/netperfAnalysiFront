import React from "react";
import "./resources/footer.css";
import LogoTn from "./imgs/ooredoo-logo.svg";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row" >
          <p className="col-sm">
            
            Copyright &copy;{new Date().getFullYear()}  <h  className="font-weight-bold">Tunisie.</h>
             {" "}All right reserved
          </p>
          
        </div>
      </div>
    </div>
  );
}

export default Footer;
