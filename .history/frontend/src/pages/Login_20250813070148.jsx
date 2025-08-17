import jwt from "jsonwebtoken";
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import Logo from "../assets/logo.png";
import { authDataContext } from '../context/authContext';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });

      console.log(result.data);
      setLoading(false);
      getCurrentUser();
      toast.success("User Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("User Login Failed");
      setLoading(false);
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start'>
      <div className='w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
        <img className='w-[40px]' src={Logo} alt="Logo" />
        <h1 className='text-[22px] font-sans'>Wrist Watch</h1>
      </div>

      <div className='w-full h-[100px] flex flex-col items-center justify-center gap-[10px]'>
        <span className='text-[25px] font-semibold'>Login Page</span>
        <span className='text-[16px]'>Welcome to Wrist Watch app, Place your order</span>
      </div>

      <div className='max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
        <form onSubmit={handleLogin} className='w-[90%] flex flex-col items-center justify-start gap-[20px]'>
          <div className='w-full flex flex-col items-center gap-[15px] relative'>

            <input
              type="text"
              className='w-full h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type={show ? "text" : "password"}
              className='w-full h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold'
              placeholder='Password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {show ? (
              <IoEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] top-[80px]' onClick={() => setShow(!show)} />
            ) : (
              <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute right-[5%] top-[80px]' onClick={() => setShow(!show)} />
            )}

            <button
              type="submit"
              className='w-full h-[50px] bg-[#6060f5] rounded-lg mt-[20px] flex items-center justify-center text-[17px] font-semibold'
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
