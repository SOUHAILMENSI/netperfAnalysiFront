import React from "react";
import { getUser, removeUserSession } from "./Utils/Common";
import { NavLink } from "react-router-dom";

import { useHistory } from "react-router-dom";
function Headers(props) {
  const user = getUser();

  const history = useHistory();
  const handleLogout = () => {
    removeUserSession();
    history.push("/login");
  };
  return (
    <div className="header">
      <NavLink exact activeClassName="active" to="/">
        Home
      </NavLink>
      <NavLink activeClassName="active" to="/login">
        Login
      </NavLink>
      <small>(Access without token only)</small>
      <NavLink activeClassName="active" to="/dashboard">
        Dashboard
      </NavLink>
      <small>(Access with token only)</small>
      <div>
        Welcome {user.name}!<br />
        <br />
        <input type="button" onClick={handleLogout} value="Logout" />
      </div>
    </div>
  );
}

export default Headers;
