import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from "../pages/Login"
import Register from "../pages/Register";
import Home from "../pages/Home";

export default function Routers() {
  return (
    <>
      <Routes>
        {/* <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Login />}></Route> */}
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </>
  );
}
