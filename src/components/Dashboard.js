import React, { useState } from "react";
import { getUser } from "../Utils/Common";
import Headers from "../headers";
import { useHistory } from "react-router-dom";
import QosChartApp from "./QosChartApp";

function Dashboard(props) {
  const history = useHistory();
  const user = getUser();
  const xx = (e) => {
    setCart((ca) => ca.concat(<QosChartApp />));
  };
  var [cart, setCart] = useState([<QosChartApp />]);
  return user ? (
    <div>
      <Headers />
      <div className="container-fluid">
      {cart}
      <button className="btn btn-primary float-right row mt-4 mr-5" type="button" onClick={(e) => xx(e)}>
        add new import
      </button>
      </div>
    </div>
  ) : (
    history.push("/qosdashboard")
  );
}

export default Dashboard;
