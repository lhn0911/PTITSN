import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  FaUser,
  FaLock,
  FaFacebook,
  FaTwitter,
  FaGoogle,
} from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.scss";
import baseUrl from "../../api/index";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState(""); // New field for bio
  const [avatar, setAvatar] = useState(""); // New field for avatar
  const [banner, setBanner] = useState(""); // New field for banner
  const [chat, setChat] = useState(""); // New field for chat
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    avatar: "",
    banner: "",
    general: "",
    chat: "",
  });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    let isValid = true;
    let errors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!firstName) {
      isValid = false;
      errors.firstName = "Vui lòng nhập tên";
    }

    if (!lastName) {
      isValid = false;
      errors.lastName = "Vui lòng nhập họ";
    }

    if (!email) {
      isValid = false;
      errors.email = "Vui lòng nhập email";
    } else if (!validateEmail(email)) {
      isValid = false;
      errors.email = "Email không hợp lệ";
    }

    if (!password) {
      isValid = false;
      errors.password = "Vui lòng nhập mật khẩu";
    } else if (password.length < 5) {
      isValid = false;
      errors.password = "Mật khẩu phải có ít nhất 5 kí tự";
    }

    if (password !== confirmPassword) {
      isValid = false;
      errors.confirmPassword = "Nhập lại mật khẩu không đúng";
    }

    setError(errors);

    if (isValid) {
      try {
        const response = await baseUrl.get("/User");
        const existingUsers = response.data;
        const emailExists = existingUsers.some(
          (user: any) => user.email === email
        );

        if (emailExists) {
          setError((prevError) => ({
            ...prevError,
            email: "Email đã được sử dụng",
          }));
          return;
        }

        const newUser = {
          username: `${firstName} ${lastName}`,
          email: email,
          password: password,
          avatar: "", // Default to empty string
          banner: "", // Default to empty string
          bio: "", // Default to empty string
          follows: [], // Default to empty array
          friends: [], // Default to empty array
          groups: [], // Default to empty array
          status: false,
          role: "user", // Default role
          chat: [],
          created_at: new Date().toISOString(), // Current timestamp
        };

        const postResponse = await baseUrl.post("/User", newUser);

        if (postResponse.status === 201) {
          setShowModal(true);
        } else {
          setError((prevError) => ({
            ...prevError,
            general: "Đăng kí thất bại. Vui lòng thử lại sau!",
          }));
        }
      } catch (error) {
        setError((prevError) => ({
          ...prevError,
          general: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
        }));
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-info-subtle register-container">
      <h1 className="text-black mb-4">ĐĂNG KÍ</h1>
      <div className="bg-white p-4 rounded shadow text-center register-form d-flex flex-column gap-3">
        <div className="d-flex gap-2">
          <div>
            <div className="input-container flex-grow-1">
              <FaUser className="input-icon text-primary" />
              <input
                type="text"
                placeholder="Họ"
                className={`form-control ${
                  error.firstName ? "is-invalid" : ""
                }`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            {error.firstName && (
              <div className="invalid-feedback m-0">{error.firstName}</div>
            )}
          </div>
          <div>
            <div className="input-container flex-grow-1">
              <FaUser className="input-icon text-primary" />
              <input
                type="text"
                placeholder="Tên"
                className={`form-control ${error.lastName ? "is-invalid" : ""}`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            {error.lastName && (
              <div className="invalid-feedback">{error.lastName}</div>
            )}
          </div>
        </div>
        <div>
          <div className="input-container">
            <AiOutlineMail className="input-icon text-primary" />
            <input
              type="email"
              placeholder="Email"
              className={`form-control ${error.email ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {error.email && <div className="invalid-feedback">{error.email}</div>}
        </div>
        <div>
          <div className="input-container">
            <FaLock className="input-icon text-primary" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              className={`form-control ${error.password ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FiEyeOff
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FiEye
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          {error.password && (
            <div className="invalid-feedback">{error.password}</div>
          )}
        </div>
        <div>
          <div className="input-container">
            <FaLock className="input-icon text-primary" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              className={`form-control ${
                error.confirmPassword ? "is-invalid" : ""
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {showConfirmPassword ? (
              <FiEyeOff
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            ) : (
              <FiEye
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          </div>
          {error.confirmPassword && (
            <div className="invalid-feedback">{error.confirmPassword}</div>
          )}
        </div>
        {error.general && (
          <div className="alert alert-danger">{error.general}</div>
        )}
        <button className="btn btn-primary w-100 mb-2" onClick={handleRegister}>
          ĐĂNG KÍ
        </button>
        <a href="#" onClick={handleLogin}>
          Bạn đã có tài khoản? Đăng nhập!
        </a>
      </div>
      <div className="d-flex gap-2 align-items-center mt-4">
        <button className="btn btn-primary d-flex align-items-center">
          <FaFacebook className="me-2" /> Facebook
        </button>
        <button className="btn btn-info d-flex align-items-center">
          <FaTwitter className="me-2" /> Twitter
        </button>
        <button className="btn btn-danger d-flex align-items-center">
          <FaGoogle className="me-2" /> Google
        </button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký thành công</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn đã đăng ký thành công!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
