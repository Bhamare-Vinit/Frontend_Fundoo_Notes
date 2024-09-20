// import React, { Component } from "react";
import "../styles/Register.css";
import TextField from "@mui/material/TextField";

// class Register extends Component {
//   //start

//   //end
//   render() {
//     return (
//       // <!-- main div -->
//       <div className="main-div">
//         {/* <!-- left div --> */}
//         <div className="left-div">
//           {/* <!-- Name div (1st div)--> */}

//           <div className="name-div">
//             <div className="google-div">
//               <span className="google-span" style={{ color: "rgb(4, 4, 125)" }}>
//                 G
//               </span>
//               <span className="google-span" style={{ color: "rgb(208, 3, 3)" }}>
//                 o
//               </span>
//               <span
//                 className="google-span"
//                 style={{ color: "rgb(222, 218, 4)" }}
//               >
//                 o
//               </span>
//               <span className="google-span" style={{ color: "rgb(4, 4, 125)" }}>
//                 g
//               </span>
//               <span
//                 className="google-span"
//                 style={{ color: "rgba(17, 206, 4, 0.749)" }}
//               >
//                 l
//               </span>
//               <span className="google-span" style={{ color: "rgb(208, 3, 3)" }}>
//                 e
//               </span>
//             </div>
//             <div className="info-div">
//               <span style={{ fontSize: "25px" }}>
//                 Create your Google Account
//               </span>
//             </div>
//           </div>
//           {/* <!-- input info div 2nd div --> */}
//           <div className="main-input-div">
//             <div className="submain-input-div1">
//               {/* <input
//                 className="name-input"
//                 type="text"
//                 placeholder="First Name*"
//               /> */}
//               <TextField
//                 className="name-input"
//                 id="fname"
//                 label="First Name"
//                 variant="outlined"
//                 // value={this.state.fname}
//                 // onChange={this.handleChange}
//                 // error={!!errors.fname} // Shows red border if error exists
//                 // helperText={errors.fname}
//               />
//               {/* <input
//                 className="name-input"
//                 type="text"
//                 placeholder="Last Name*"
//               /> */}
//               <TextField
//                 className="name-input"
//                 id="lname"
//                 label="Last Name"
//                 variant="outlined"
//               />
//             </div>
//             <div className="submain-input-div2">
//               {/* <input
//                 className="username-input"
//                 type="text"
//                 placeholder="username*"
//               /> */}
//               <TextField
//                 className="username-input"
//                 id="username"
//                 label="username"
//                 variant="outlined"
//               />
//               <div className="info2-div">
//                 <span className="info-span">
//                   you can use letters,numbers & periods
//                 </span>
//                 <a href="" className="email-link">
//                   Use my current email address instead
//                 </a>
//               </div>
//             </div>
//           </div>
//           {/* <!-- password div --> */}
//           <div className="pass-div">
//             <div className="pass-input-div">
//               {/* <input
//                 className="pass-input"
//                 type="text"
//                 placeholder="Password*"
//               /> */}
//               <TextField
//                 className="pass-input"
//                 id="password"
//                 label="Password"
//                 variant="outlined"
//               />
//               {/* <input
//                 className="pass-input"
//                 type="text"
//                 placeholder="Confirm*"
//               /> */}
//               <TextField
//                 className="pass-input"
//                 id="Confirm"
//                 label="Confirm"
//                 variant="outlined"
//               />
//             </div>
//             <div className="pass-info">
//               <span>
//                 Use 8 or more characters with a mix of letters, numbers &
//                 symbols
//               </span>
//               <div className="check-div">
//                 <input type="checkbox" id="show-password" />
//                 <label for="show-password" style={{ marginLeft: "10px" }}>
//                   Show Password
//                 </label>
//               </div>
//             </div>
//           </div>
//           {/* <!-- button div --> */}
//           <div className="button-main-div">
//             <div className="signin-div">
//               <a href="" style={{ textDecoration: "none" }}>
//                 Sign in insted
//               </a>
//             </div>
//             <div className="button-div">
//               <button className="button" onClick={this.handleSubmit}>
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* <!-- right div --> */}
//         <div className="right-div">just image</div>
//       </div>
//     );
//   }
// }

// export default Register;
import React, { useState } from "react";

import { signUp } from "../services/userServices";
const Register = () => {
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    service: "advance",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  function handleInput(e) {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
  }

  async function handleValidation(e) {
    e.preventDefault();
    setErrors(Validation(values));

    if (Object.keys(errors).length === 0) {
      console.log("Initail data: ", values); // Log user data
      try {
        let response = await signUp(values);
        console.log(response.data);
      } catch (err) {
        // toast.error("User already exists");
        console.log("error: ", err);
      }

      // console.log(values); // Log user data
      setSuccess("User registered successfully!"); // Show success message
    }
  }
  function Validation(values) {
    const errors = {};
    const email_pattern = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]{2,})\.[a-z]*$/;
    const password_pattern =
      /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;
    const name_pattern = /^[A-Z]{1}[a-z]{2,}$/;

    if (values.first_name === "") {
      errors.first_name = "First Name is required";
    } else if (!name_pattern.test(values.first_name)) {
      errors.first_name = "Invalid First Name";
    }

    if (values.last_name === "") {
      errors.last_name = "Last Name is required";
    } else if (!name_pattern.test(values.last_name)) {
      errors.last_name = "Invalid Last Name";
    }
    if (values.email === "") {
      errors.email = "username is required";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Invalid Email";
    }
    if (values.password === "") {
      errors.password = "Password is required";
    } else if (!password_pattern.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters long and include an uppercase letter, number, and special symbol";
    }

    if (values.confirmPassword === "") {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  }

  return (
    // <!-- main div -->
    <div className="main-div">
      {/* <!-- left div --> */}
      <div className="left-div">
        {/* <!-- Name div (1st div)--> */}
        <form
          onSubmit={handleValidation}
          style={{ width: "100%", height: "100%" }}
        >
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
              {/* <input
        className="name-input"
        type="text"
        placeholder="First Name*"
      /> */}
              <TextField
                className="name-input"
                id="fname"
                name="first_name"
                label="First Name"
                variant="outlined"
                onChange={handleInput}
                error={!!errors.first_name} // Shows red border if error exists
                helperText={errors.first_name}
              />
              {/* <input
        className="name-input"
        type="text"
        placeholder="Last Name*"
      /> */}
              <TextField
                className="name-input"
                id="lname"
                name="last_name"
                label="Last Name"
                variant="outlined"
                onChange={handleInput}
                error={!!errors.last_name} // Shows red border if error exists
                helperText={errors.last_name}
              />
            </div>
            <div className="submain-input-div2">
              {/* <input
        className="username-input"
        type="text"
        placeholder="username*"
      /> */}
              <TextField
                className="username-input"
                id="username"
                name="email"
                label="username"
                variant="outlined"
                onChange={handleInput}
                error={!!errors.email} // Shows red border if error exists
                helperText={errors.email}
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
              {/* <input
        className="pass-input"
        type="text"
        placeholder="Password*"
      /> */}
              <TextField
                className="pass-input"
                name="password"
                id="password"
                label="Password"
                variant="outlined"
                onChange={handleInput}
                error={!!errors.password} // Shows red border if error exists
                helperText={errors.password}
              />
              {/* <input
        className="pass-input"
        type="text"
        placeholder="Confirm*"
      /> */}
              <TextField
                className="pass-input"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm"
                variant="outlined"
                onChange={handleInput}
                error={!!errors.confirmPassword} // Shows red border if error exists
                helperText={errors.confirmPassword}
              />
            </div>
            <div className="pass-info">
              <span>
                Use 8 or more characters with a mix of letters, numbers &
                symbols
              </span>
              <div className="check-div">
                <input type="checkbox" id="show-password" />
                <label htmlFor="show-password" style={{ marginLeft: "10px" }}>
                  Show Password
                </label>
              </div>
            </div>
          </div>
          {/* <!-- button div --> */}
          <div className="button-main-div">
            <div className="signin-div">
              <a href="/" style={{ textDecoration: "none" }}>
                Sign in insted
              </a>
            </div>
            <div className="button-div">
              <button className="button" type="submit">
                Next
              </button>
            </div>
          </div>
          {/* to display success message */}
          {success && <div className="success-message">{success}</div>}
        </form>
      </div>
      {/* <!-- right div --> */}
      <div className="right-div">just image</div>
    </div>
  );
};

export default Register;
