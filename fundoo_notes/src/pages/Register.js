import React, { Component } from "react";
import "../styles/Register.css";

class Register extends Component {
  render() {
    return (
      // <!-- main div -->
      <div className="main-div">
        {/* <!-- left div --> */}
        <div className="left-div">
          {/* <!-- Name div (1st div)--> */}

          <div className="name-div">
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
            <div className="info-div">
              <span style={{ fontSize: "25px" }}>
                Create your Google Account
              </span>
            </div>
          </div>
          {/* <!-- input info div 2nd div --> */}
          <div className="main-input-div">
            <div className="submain-input-div1">
              <input
                className="name-input"
                type="text"
                placeholder="First Name*"
              />
              <input
                className="name-input"
                type="text"
                placeholder="Last Name*"
              />
            </div>
            <div className="submain-input-div2">
              <input
                className="username-input"
                type="text"
                placeholder="username*"
              />
              <div className="info2-div">
                <span className="info-span">
                  you can use letters,numbers & periods
                </span>
                <a href="" className="email-link">
                  Use my current email address instead
                </a>
              </div>
            </div>
          </div>
          {/* <!-- password div --> */}
          <div className="pass-div">
            <div className="pass-input-div">
              <input
                className="pass-input"
                type="text"
                placeholder="Password*"
              />
              <input
                className="pass-input"
                type="text"
                placeholder="Confirm*"
              />
            </div>
            <div className="pass-info">
              <span>
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </span>
              <div className="check-div">
                <input type="checkbox" id="show-password" />
                <label for="show-password" style={{ marginLeft: "10px" }}>
                  Show Password
                </label>
              </div>
            </div>
          </div>
          {/* <!-- button div --> */}
          <div className="button-main-div">
            <div className="signin-div">
              <a href="" style={{ textDecoration: "none" }}>
                Sign in insted
              </a>
            </div>
            <div className="button-div">
              <button className="button">Next</button>
            </div>
          </div>
        </div>
        {/* <!-- right div --> */}
        <div className="right-div">just image</div>
      </div>
    );
  }
}

export default Register;
