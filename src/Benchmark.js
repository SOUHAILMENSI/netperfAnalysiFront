import React, { useState } from "react";
import { getUser } from "./Utils/Common";
import Headers from "./headers";
import { useHistory } from "react-router-dom";
import ChartApp from "./ChartApp";

function Benchmark(props) {
  const history = useHistory();
  const user = getUser();
  const xx = (e) => {
    setCart((ca) => ca.concat(<ChartApp />));
  };
  var [cart, setCart] = useState([<ChartApp />]);
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
    history.push("/home")
  );
}

export default Benchmark;
