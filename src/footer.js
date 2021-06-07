import React from "react";
import "./resources/footer.css";
import LogoTn from "./imgs/ooredoo-logo.svg";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row" >
          <p className="col-sm">
            
            Copyright &copy;{new Date().getFullYear()}  <h  className="font-weight-bold">Ooredoo Tunisie.</h>
             {" "}All right reserved
          </p>
          <img
              alt=""
              src={LogoTn}
              width="125"
              height="75"
              className="map img-resonsive"
            />
        </div>
      </div>
    </div>
  );
}

export default Footer;
