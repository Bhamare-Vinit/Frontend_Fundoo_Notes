import React from "react";
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Register";

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
