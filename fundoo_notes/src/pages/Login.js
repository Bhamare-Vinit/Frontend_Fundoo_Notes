// import React, { Component } from "react";
import "../styles/Login.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";

// class Login extends Component {
//   //start

//   //end
//   render() {
//     //start
//     const [values, setValues] = useState({
//       username: "",
//       password: "",
//     });
//     const [errors, setErrors] = useState({});

//     function handleInput(e) {
//       const newObj = { ...values, [e.target.name]: e.target.value };
//       setValues(newObj);
//     }
//     function handleValidation(e) {
//       e.preventDefault();
//       setErrors(Validation(values));
//     }

//     function Validation(values) {
//       const errors = {};
//       const email_pattern = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]{2,})\.[a-z]*$/;
//       const password_pattern =
//         /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;
//       if (values.name === "") {
//         errors.name = "Name is required";
//       }

//       if (values.email === "") {
//         errors.name = "email is required";
//       } else if (!email_pattern.test(values.email)) {
//         errors.email = "invalid email";
//       }
//       if (values.password === "") {
//         errors.password = "password is required";
//       } else if (!password_pattern.test(values.password)) {
//         errors.password = "invalid password";
//       }

//       return errors;
//     }

//     //end
//     return (
//       <div className="lmain-div">
//         <div className="linner-div">
//           <div className="lnames-div">
//             <div className="lgoogle-div">
//               <span
//                 className="lgoogle-span"
//                 style={{ color: "rgb(4, 4, 125)" }}
//               >
//                 G
//               </span>
//               <span
//                 className="lgoogle-span"
//                 style={{ color: "rgb(208, 3, 3)" }}
//               >
//                 o
//               </span>
//               <span
//                 className="lgoogle-span"
//                 style={{ color: "rgb(222, 218, 4)" }}
//               >
//                 o
//               </span>
//               <span
//                 className="lgoogle-span"
//                 style={{ color: "rgb(4, 4, 125)" }}
//               >
//                 g
//               </span>
//               <span
//                 className="lgoogle-span"
//                 style={{ color: "rgba(17, 206, 4, 0.749)" }}
//               >
//                 l
//               </span>
//               <span
//                 className="lgoogle-span"
//                 style={{ color: "rgb(208, 3, 3)" }}
//               >
//                 e
//               </span>
//             </div>
//             <div className="llogin-div">
//               <span style={{ fontsize: "22px" }}>Login</span>
//             </div>
//             <div className="linfo-div">
//               <span>Use your Google Account</span>
//             </div>
//           </div>
//           <div className="lname-input-div">
//             <TextField
//               className="lname-input"
//               id="outlined-basic"
//               label="Email or Phone"
//               variant="outlined"
//               size="small"
//               onChange={handleInput}
//               error={!!errors.email}
//               helperText={errors.email}
//             />
//             {/* <input
//               className="lname-input"
//               type="text"
//               placeholder="Email or Phone*"
//             /> */}
//           </div>
//           <div className="lpassword-input-div">
//             <TextField
//               className="lpassword-input"
//               id="outlined-basic"
//               label="Password"
//               variant="outlined"
//               size="small"
//               onChange={handleInput}
//               error={!!errors.password}
//               helperText={errors.password}
//             />
//             {/* <input
//               className="lpassword-input"
//               type="text"
//               placeholder="Password*"
//             /> */}
//           </div>
//           <div className="lforgot-div">
//             <a className="lforget-link" href="">
//               forgot Password?
//             </a>
//           </div>
//           <div className="lbutton-div">
//             <a href="" className="forget-link">
//               Create account
//             </a>
//             <button className="llogin-button" onClick={handleValidation}>
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Login;

import React from "react";
import { signIn } from "../services/userServices";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  function handleInput(e) {
    const newObj = { ...values, [e.target.name]: e.target.value };
    setValues(newObj);
  }
  async function handleValidation(e) {
    e.preventDefault();
    setErrors(Validation(values));

    if (Object.keys(errors).length === 0) {
      console.log("Initail data: ", values);
      try {
        let response = await signIn(values);
        // console.log("response:", response);
        // console.log("response_data:", response.data);
        // console.log("accesss1:", response.data.data.access);

        // // console.log(response.data);
        // console.log("access2:", JSON.stringify(response.data.access));
        localStorage.setItem("access", response.data.data.access);
        console.log("access Token", response.data.data.access);
      } catch (err) {
        // toast.error("User already exists");
        console.log("error: ", err);
      }
    }
  }

  function Validation(values) {
    const errors = {};
    const email_pattern = /^[a-z]{3,}(.[0-9a-z]*)?@([a-z]{2,})\.[a-z]*$/;
    const password_pattern =
      /^.*(?=.{8,})(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).*$/;

    if (values.email === "") {
      errors.name = "email is required";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "invalid email";
    }
    if (values.password === "") {
      errors.password = "password is required";
    } else if (!password_pattern.test(values.password)) {
      errors.password = "invalid password";
    }

    return errors;
  }
  return (
    <>
      <div className="lmain-div">
        <form
          onSubmit={handleValidation}
          style={{ width: "100%", height: "100%" }}
        >
          <div className="linner-div">
            <div className="lnames-div">
              <div className="lgoogle-div">
                <span
                  className="lgoogle-span"
                  style={{ color: "rgb(4, 4, 125)" }}
                >
                  G
                </span>
                <span
                  className="lgoogle-span"
                  style={{ color: "rgb(208, 3, 3)" }}
                >
                  o
                </span>
                <span
                  className="lgoogle-span"
                  style={{ color: "rgb(222, 218, 4)" }}
                >
                  o
                </span>
                <span
                  className="lgoogle-span"
                  style={{ color: "rgb(4, 4, 125)" }}
                >
                  g
                </span>
                <span
                  className="lgoogle-span"
                  style={{ color: "rgba(17, 206, 4, 0.749)" }}
                >
                  l
                </span>
                <span
                  className="lgoogle-span"
                  style={{ color: "rgb(208, 3, 3)" }}
                >
                  e
                </span>
              </div>
              <div className="llogin-div">
                <span style={{ fontsize: "22px" }}>Login</span>
              </div>
              <div className="linfo-div">
                <span>Use your Google Account</span>
              </div>
            </div>
            <div className="lname-input-div">
              <TextField
                className="lname-input"
                name="email"
                id="outlined-basic"
                label="Email or Phone"
                variant="outlined"
                size="small"
                onChange={handleInput}
                error={!!errors.email}
                helperText={errors.email}
              />
              {/* <input
              className="lname-input"
              type="text"
              placeholder="Email or Phone*"
            /> */}
            </div>
            <div className="lpassword-input-div">
              <TextField
                className="lpassword-input"
                name="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                onChange={handleInput}
                error={!!errors.password}
                helperText={errors.password}
              />
              {/* <input
              className="lpassword-input"
              type="text"
              placeholder="Password*"
            /> */}
            </div>
            <div className="lforgot-div">
              <a className="lforget-link" href="">
                forgot Password?
              </a>
            </div>
            <div className="lbutton-div">
              <a href="" className="forget-link">
                Create account
              </a>
              <button className="llogin-button" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
