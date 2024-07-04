import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/home/Home";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
