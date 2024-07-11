import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./layout/Header/Header";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Me from "./pages/user/User";
import Friend from "./pages/user/Friend";
import Group from "./pages/user/Group";
import Events from "./pages/user/Events";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./pages/admin/Admin";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/me" element={<Me />} />
        <Route path="/friend" element={<Friend />} />
        <Route path="/group" element={<Group />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

export default App;
