import React, { Component } from "react";
import "../styles/Login.css";

class Login extends Component {
  render() {
    return (
      <div className="main-div">
        <div className="inner-div">
          <div className="names-div">
            <div className="google-div">
              <span className="google-span" style={{ color: "rgb(4, 4, 125)" }}>
                G
              </span>
              <span className="google-span" style={{ color: "rgb(208, 3, 3)" }}>
                o
              </span>
              <span
                className="google-span"
                style={{ color: "rgb(222, 218, 4)" }}
              >
                o
              </span>
              <span className="google-span" style={{ color: "rgb(4, 4, 125)" }}>
                g
              </span>
              <span
                className="google-span"
                style={{ color: "rgba(17, 206, 4, 0.749)" }}
              >
                l
              </span>
              <span className="google-span" style={{ color: "rgb(208, 3, 3)" }}>
                e
              </span>
            </div>
            <div className="login-div">
              <span style={{ fontsize: "22px" }}>Login</span>
            </div>
            <div className="info-div">
              <span>Use your Google Account</span>
            </div>
          </div>
          <div className="name-input-div">
            <input
              className="name-input"
              type="text"
              placeholder="Email or Phone*"
            />
          </div>
          <div className="password-input-div">
            <input
              className="password-input"
              type="text"
              placeholder="Password*"
            />
          </div>
          <div className="forgot-div">
            <a className="forget-link" href="">
              forgot Password?
            </a>
          </div>
          <div className="button-div">
            <a href="" className="forget-link">
              Create account
            </a>
            <button className="login-button">Login</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
