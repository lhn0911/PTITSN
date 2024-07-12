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
import Admin from "./pages/admin/Admin";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Admin route */}
      <Route path="/admin/*" element={<Admin />} />

      {/* User routes */}
      <Route
        path="*"
        element={
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
            </Routes>
          </>
        }
      />
    </Routes>
  );
};

export default App;
