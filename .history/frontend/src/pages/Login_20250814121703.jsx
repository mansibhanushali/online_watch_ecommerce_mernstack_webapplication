import React, { useContext, useState } from 'react';
import logo from '../assets/logo1.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/auth/login`, { email, password }, { withCredentials: true });

      if (res.data?.token) {
        // ✅ Save token in localStorage
        localStorage.setItem("token", res.data.token);

        // ✅ Fetch current user data immediately
        await getCurrentUser();

        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(res.data?.message || "Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <img src={logo} alt="Logo" />
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-field">
          <input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span onClick={() => setShow(!show)}>
            {show ? <IoEye /> : <IoEyeOutline />}
          </span>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
