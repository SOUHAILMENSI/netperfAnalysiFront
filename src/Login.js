import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "./Utils/Common";
import "./resources/login.css";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput("");
  const password = useFormInput("");
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACK_URI}/users/signin`, {
        username: username.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response && error.response.status === 401)
          setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 col-xl-9 mx-auto">
          <div className="card card-login flex-row my-5">
            <div className="card-img-left d-none d-md-flex"></div>
            <div class="card-body">
              
              <h5 className="card-title text-center ">Netperf Analytics</h5>
              <form className="form-login">
                <div className="form-label-group">
                  <input
                    type="text" {...username}
                    id="inputUserame"
                    className="form-control"
                    placeholder="Username"
                    required
                    autofocus
                  ></input>
                  <label for="inputUserame" >Username</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="password" {...password}
                    id="inputPassword"
                    className="form-control"
                    placeholder="Password"
                    required
                  ></input>
                  <label for="inputPassword">Password</label>
                </div>

                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                <hr />
                <button
                  className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
