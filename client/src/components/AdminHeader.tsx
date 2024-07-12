// src/components/AdminHeader.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/userReducer";
import { useNavigate } from "react-router-dom";

const AdminHeader: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header
      style={{
        backgroundColor: "#333",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>Admin Dashboard</h1>
      <nav>
        <button onClick={() => navigate("/admin")}>Home</button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
};

export default AdminHeader;
