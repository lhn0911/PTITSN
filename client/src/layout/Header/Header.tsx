import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/reducers/userReducer";
import { login, logout } from "../../store/reducers/userReducer";
import "./Header.scss";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Debug: Log state to check if it updates correctly
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.currentUser !== null
  );
  const userName = useSelector(
    (state: RootState) => state.user.currentUser?.name || "User"
  );

  useEffect(() => {
    console.log("useEffect for storage change called");
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "isAuthenticated") {
        const authStatus = event.newValue === "true";
        if (authStatus) {
          const name = localStorage.getItem("userName") || "User";
          dispatch(login({ name }));
        } else {
          dispatch(logout());
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("useEffect for initial auth check called");
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    if (authStatus && !isAuthenticated) {
      const name = localStorage.getItem("userName") || "User";
      dispatch(login({ name }));
    } else if (!authStatus && isAuthenticated) {
      dispatch(logout());
    }
  }, [dispatch, isAuthenticated]);

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("userName");
    dispatch(logout());
    navigate("/login");
  };

  const getNavItemClass = (path: string) => {
    return location.pathname === path
      ? "header__nav-item active"
      : "header__nav-item";
  };

  const handleNavigation = (path: string) => () => navigate(path);

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
            <li
              className={getNavItemClass("/home")}
              onClick={handleNavigation("/home")}
            >
              <i className="fa-solid fa-house fs-3"></i>
            </li>
            {isAuthenticated && (
              <>
                <li
                  className={getNavItemClass("/me")}
                  onClick={handleNavigation("/me")}
                >
                  <i className="fa-regular fa-user fs-3"></i>
                </li>
                <li
                  className={getNavItemClass("/friend")}
                  onClick={handleNavigation("/friend")}
                >
                  <i className="fa-solid fa-user-group fs-3"></i>
                </li>
                <li
                  className={getNavItemClass("/group")}
                  onClick={handleNavigation("/group")}
                >
                  <i className="fa-solid fa-users-line fs-3"></i>
                </li>
                <li
                  className={getNavItemClass("/events")}
                  onClick={handleNavigation("/events")}
                >
                  <i className="fa-regular fa-calendar fs-3"></i>
                </li>
              </>
            )}
          </ul>
        </div>
        <nav className="header__nav">
          <ul className="header__nav-list">
            {!isAuthenticated ? (
              <>
                <li
                  className="header__nav-item"
                  onClick={handleNavigation("/register")}
                >
                  <span className="material-symbols-outlined">person</span> Đăng
                  ký
                </li>
                <li
                  className="header__nav-item"
                  onClick={handleNavigation("/login")}
                >
                  <span className="material-symbols-outlined">person</span> Đăng
                  nhập
                </li>
              </>
            ) : (
              <>
                <div className="header__profile">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/ptit-k5.appspot.com/o/kisspng-computer-icons-user-profile-user-account-clip-art-5b07b23ad4dd52.9335900715272310348719.jpg?alt=media&token=1f66fd21-3b78-45bb-bbeb-d10f047d4378"
                    alt="Profile"
                    className="header__profile-img"
                  />
                  <div className="header__profile-name">{userName}</div>
                </div>
                <li className="header__nav-item" onClick={handleLogout}>
                  <span className="material-symbols-outlined">logout</span> Đăng
                  xuất
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
