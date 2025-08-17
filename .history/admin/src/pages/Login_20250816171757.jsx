import React, { useContext, useState } from 'react';
import logo from '../assets/logo1.png';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getAdmin } = useContext(adminDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

const AdminLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const result = await axios.post(
      `${serverUrl}/api/auth/adminlogin`,
      { email, password },
      { withCredentials: true }
    );

  
    if (result.data?.token) {
      localStorage.setItem("adminToken", result.data.token);
    }

    toast.success("Admin Login Successful");

    await getAdmin();
    navigate("/admin/home");

  } catch (error) {
    toast.error(error?.response?.data?.message || "Admin Login Failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-screen h-screen bg-gradient-to-br from-[burlywood] via-[#burlwood] to-[burlywood] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="Logo" className="w-16" />
          <h1 className="text-xl font-semibold mt-2 text-white">Wrist Watch</h1>
        </div>

        <p className="text-sm text-gray-300 mt-2 text-center">
          Welcome to Wrist Watch Admin Dashboard
        </p>

        <form onSubmit={AdminLogin} className="flex flex-col gap-6 mt-8 w-full">
          
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-[#222d2f] border border-[#3f5052] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#4db8ff]"
          />

          <div className="relative w-full">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-[#222d2f] border border-[#3f5052] placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-[#4db8ff]"
            />
            <span
              className="absolute right-3 top-3.5 cursor-pointer text-gray-400 hover:text-white"
              onClick={() => setShow(!show)}
            >
              {show ? <IoEye /> : <IoEyeOutline />}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-lg text-lg font-semibold bg-gradient-to-r from-[#4db8ff] to-[#1a75ff] hover:opacity-90 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
