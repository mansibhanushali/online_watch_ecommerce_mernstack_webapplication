import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import Logo from "../assets/logo.png";
import { authDataContext } from '../context/AuthContext';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { serverUrl, login } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (!data?.token || !data?.user) {
        toast.error("Invalid response from server");
        return;
      }

      // ✅ Context + LocalStorage me save hoga automatically via AuthContext
      login({ token: data.token, user: data.user });

      // ✅ User fresh data fetch karna (agar zarurat ho)
      await getCurrentUser(data.token);

      toast.success(`Welcome, ${data.user.name || "User"}!`);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "User Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[burlwood] to-[burlywood] text-black flex flex-col items-center justify-start'>
      {/* Logo */}
      <div
        className='w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer'
        onClick={() => navigate("/")}
      >
        <img className='w-[40px]' src={Logo} alt="Logo" />
        <h1 className='text-[22px] font-sans'>Wrist Watch</h1>
      </div>

      {/* Heading */}
      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-[10px]'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[16px]'>Welcome to Wrist Watch app, Place your order</span>
      </div>

      {/* Form */}
      <div className='max-w-[600px] w-[90%] h-[400px] bg-[#e1c6a4] border-2 border-[black] rounded-lg shadow-lg flex items-center justify-center'>
        <form onSubmit={handleLogin} className='w-[90%] flex flex-col items-center gap-[20px]'>
          <div className='w-full flex flex-col gap-[15px] relative'>
            <input
              type="email"
              className='w-full h-[50px] border-[2px] border-[black] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type={show ? "text" : "password"}
              className='w-full h-[50px] border-[2px] border-[black] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {show ? (
              <IoEye
                className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] top-[80px]'
                onClick={() => setShow(!show)}
              />
            ) : (
              <IoEyeOutline
                className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] top-[80px]'
                onClick={() => setShow(!show)}
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className='w-full h-[50px] bg-[[#d9ad75] rounded-lg mt-[20px] flex items-center justify-center text-[17px] font-semibold'
            >
              {loading ? <Loading /> : "Login"}
            </button>

            <p className='flex gap-[10px] text-sm'>
              You haven't any account?
              <span
                className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'
                onClick={() => navigate("/signup")}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
