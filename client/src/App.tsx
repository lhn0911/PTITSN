import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header/Header";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/home/Home";
import Me from "./components/pages/user/User";
// import Frend from "./components/frend/Frend";
// import Group from "./components/group/Group";
// import Events from "./components/events/Events";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me" element={<Me />} />
        {/* <Route path="/frend" element={<Frend />} />
        <Route path="/group" element={<Group />} />
        <Route path="/events" element={<Events />} /> */}
      </Routes>
    </>
  );
};

export default App;
