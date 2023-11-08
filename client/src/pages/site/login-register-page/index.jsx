import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import SiteHeader from "../../../layouts/site/header/header";
import "./index.scss";
import Login from "./login-page";
import Register from "./register-page";

const LoginRegister = () => {
  const [show, setshow] = useState(true);
  return (
    <>
      <SiteHeader />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Account - Login | Register</title>
      </Helmet>
      <div id="loginRegister">
        <div className="mainDiv">
          <div className="centerDiv container">
            <div className="account">
              <h2>Account</h2>
            </div>
            <div className="mavigationList">
              <Link to={"/"} title="Back to the home page">
                Home /
              </Link>
              <span> Account</span>
            </div>
          </div>
        </div>
        <div className="login-register-name">
          <div className="controle">
            <div className={show ? "login" : "noLogin"}>
              <a
                onClick={() => {
                  setshow(true);
                }}
              >
                Login
              </a>
            </div>
            <div className={show ? "noRegister" : "register"}>
              <a
                onClick={() => {
                  setshow(false);
                }}
              >
                Register
              </a>
            </div>
          </div>
        </div>
        <div className="loginAndRegisterForm">
          <div>{show === true ? <Login /> : <Register />}</div>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
