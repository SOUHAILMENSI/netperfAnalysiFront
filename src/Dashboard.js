import React from "react";
import { getUser, removeUserSession } from "./Utils/Common";
import Headers from "./headers";
import { useHistory } from "react-router-dom";
import XX from "./XX"
function Dashboard(props) {
  const history = useHistory();
  const user = getUser();
  return (user?  ( <div>
    <Headers />
    <XX />
  </div>):( history.push("/home"))
 
  );
}

export default Dashboard;
