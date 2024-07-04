import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.scss";
import baseUrl from "../../api/index";
const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login");
  };

  const getNavItemClass = (path: string) => {
    return location.pathname === path
      ? "header__nav-item active"
      : "header__nav-item";
  };

  return (
    <header className="header">
      <div className="header__mainbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="header__logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ptit-k5.appspot.com/o/Screenshot_2024-07-04_090459-removebg-preview.png?alt=media&token=e21209cd-aad1-4ffc-97c8-69e7d87fa322"
              alt="HobbyHub Logo"
              className="shoplogo"
            />
          </div>
          <div className="header__search">
            <input
              type="text"
              placeholder="Tìm kiếm trên Hoppy"
              className="header__search-input"
            />
            <span className="material-symbols-outlined">search</span>
          </div>
        </div>
        <div>
          <ul className="header__nav-list" style={{ gap: "80px" }}>
            <li className={getNavItemClass("/home")}>
              <a href="#home">
                <i className="fa-solid fa-house fs-3"></i>
              </a>
            </li>
            <li className={getNavItemClass("/frend")}>
              <a href="#frend">
                <i className="fa-solid fa-user-group fs-3"></i>
              </a>
            </li>
            <li className={getNavItemClass("/group")}>
              <a href="#group">
                <i className="fa-solid fa-users-line fs-3"></i>
              </a>
            </li>
            <li className={getNavItemClass("/events")}>
              <a href="#events">
                <i className="fa-regular fa-calendar fs-3"></i>
              </a>
            </li>
          </ul>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {!isAuthenticated && (
              <>
                <li
                  className="header__nav-item"
                  onClick={() => navigate("/register")}
                >
                  <span className="material-symbols-outlined">person</span> Đăng
                  kí
                </li>
                <li
                  className="header__nav-item"
                  onClick={() => navigate("/login")}
                >
                  <span className="material-symbols-outlined">person</span> Đăng
                  nhập
                </li>
              </>
            )}
            {isAuthenticated && (
              <div className="header__profile">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/ptit-k5.appspot.com/o/kisspng-computer-icons-user-profile-user-account-clip-art-5b07b23ad4dd52.9335900715272310348719.jpg?alt=media&token=1f66fd21-3b78-45bb-bbeb-d10f047d4378"
                  alt="Profile"
                />
                <div className="header__profile-name">User Name</div>
              </div>
            )}
            {isAuthenticated && (
              <li className="header__nav-item" onClick={handleLogout}>
                <span className="material-symbols-outlined">logout</span> Đăng
                xuất
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
