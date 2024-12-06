import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import baseURL from "../../api/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/userReducer";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!email || !password) {
      setError("Vui lòng điền đầy đủ thông tin");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await baseURL.get(`/User`, {
        params: { email, password },
      });
      const users = response.data;

      if (users.length > 0) {
        const user = users[0];
        if (user.status === true) {
          setError("Tài khoản bị khóa");
          setIsSubmitting(false);
          return;
        }

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userName", user.username);

        // Update localStorage with user information
        localStorage.setItem(
          "userLogin",
          JSON.stringify({
            id: user.id,
            username: user.username,
          })
        );

        dispatch(login(user)); // Dispatch user object

        console.log("User role:", user.role); // For debugging purposes

        if (user.role === "admin") {
          console.log("Redirecting to admin page");
          navigate("/admin");
        } else {
          console.log("Redirecting to home page");
          navigate("/home");
        }
      } else {
        setError("Email hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div
        className="bg-white p-5 rounded shadow"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3 position-relative">
            <AiOutlineMail className="position-absolute top-50 start-0 translate-middle-y ms-3" />
            <input
              type="email"
              className="form-control ps-5"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <FaLock className="position-absolute top-50 start-0 translate-middle-y ms-3" />
            <input
              type={showPassword ? "text" : "password"}
              className="form-control ps-5"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y me-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
        <div className="mt-3 text-center">
          <a href="#" className="text-decoration-none">
            Quên mật khẩu?
          </a>
        </div>
        <div className="mt-3 text-center">
          <span>Chưa có tài khoản? </span>
          <a href="/register" className="text-decoration-none">
            Đăng ký
          </a>
        </div>
        <div className="mt-4">
          <p className="text-center mb-3">Hoặc đăng nhập với</p>
          <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-outline-primary">
              <FaFacebook />
            </button>
            <button className="btn btn-outline-info">
              <FaTwitter />
            </button>
            <button className="btn btn-outline-danger">
              <FaGoogle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
