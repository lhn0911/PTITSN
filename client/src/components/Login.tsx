import React, { useState } from "react";
import { FaLock, FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../api/index";
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsSubmitted(true);

    if (email === "" || password === "") {
      setError("Vui lòng điền đầy đủ thông tin");
      setIsModalOpen(true);
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/User`, {
        params: {
          email,
          password,
        },
      });
      const data = response.data;

      if (data.length > 0) {
        const user = data[0];
        if (user.status === false) {
          setError("Tài khoản bị khóa");
          setIsModalOpen(true);
        } else {
          localStorage.setItem("isAuthenticated", "true");
          navigate("/home"); // Redirect to user home page
        }
      } else {
        setError("Sai tài khoản hoặc mật khẩu");
        setIsModalOpen(true);
      }
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
      setIsModalOpen(true);
    }
  };

  const handleSignup = () => {
    navigate("/register");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-info-subtle">
      <div>
        <h1 className="text-black text-center mb-4">ĐĂNG NHẬP</h1>
        <div
          className="bg-white p-4 rounded shadow text-center w-100"
          style={{ maxWidth: "400px" }}
        >
          <div className="mb-3 position-relative">
            <AiOutlineMail className="position-absolute top-50 start-0 translate-middle-y text-primary ms-2" />
            <input
              type="email"
              placeholder="Email"
              className={`form-control ps-5 ${
                isSubmitted && email === "" ? "is-invalid" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 position-relative">
            <FaLock className="position-absolute top-50 start-0 translate-middle-y text-primary ms-2" />
            <input
              type="password"
              placeholder="Mật khẩu"
              className={`form-control ps-5 ${
                isSubmitted && password === "" ? "is-invalid" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FiEye
              className="position-absolute top-50 translate-middle-y text-primary me-2"
              style={{ right: "10px", cursor: "pointer" }}
              onClick={() => setPassword((prev) => (prev ? "" : password))}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-primary w-100 mb-2" onClick={handleLogin}>
            ĐĂNG NHẬP
          </button>
          <a href="#" className="d-block mb-3 text-primary">
            Quên mật khẩu?
          </a>

          <a href="#" onClick={handleSignup}>
            Bạn chưa có tài khoản? Đăng kí
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
        {isModalOpen && (
          <div className="modal d-block" tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Error</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>{error}</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
