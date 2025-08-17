import React, { useState, useContext } from 'react';
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { authDataContext } from '../context/authContext';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Registration() {
    const [show, setShow] = useState(false);
    const { serverUrl } = useContext(authDataContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { getCurrentUser } = useContext(userDataContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const result = await axios.post(serverUrl + '/api/auth/registration', {
                name, email, password
            }, { withCredentials: true });
            getCurrentUser();
            navigate("/");
            toast.success("User Registration Successful");
            console.log(result.data);
        } catch (error) {
            console.log(error);
            toast.error("User Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-[100vw] h-[100vh] bg-gradient-to-l from-[burlwood] to-[burlywood] text-black flex flex-col items-center justify-start'>
            <div className='w-full h-[80px] flex items-center px-[30px] gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <img className='w-[40px]' src={Logo} alt="logo" />
                <h1 className='text-[22px] font-sans'>Wrist Watch</h1>
            </div>

            <div className='w-full h-[100px] flex flex-col items-center justify-center gap-[10px]'>
                <span className='text-[25px] font-semibold'>Registration Page</span>
                <span className='text-[16px]'>Welcome to Wrist Watch App, Place your order</span>
            </div>

            <div className='max-w-[600px] w-[90%] h-[500px] bg-[#d9ad75] border border-[black] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
                <form onSubmit={handleSignup} className='w-[90%] h-[90%] flex flex-col items-center gap-[20px]'>
                    <div className='w-full h-[400px] flex flex-col gap-[15px] relative'>
                        <input type="text" className='w-full h-[50px] border-2 border-[black] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-white px-[20px] font-semibold' placeholder='UserName' required onChange={(e) => setName(e.target.value)} value={name} />

                        <input type="text" className='w-full h-[50px] border-2 border-[black] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-white px-[20px] font-semibold' placeholder='Email' required onChange={(e) => setEmail(e.target.value)} value={email} />

                        <input type={show ? "text" : "password"} className='w-full h-[50px] border-2 border-[black] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-white px-[20px] font-semibold' placeholder='Password' required onChange={(e) => setPassword(e.target.value)} value={password} />

                        {!show ? (
                            <IoEyeOutline className='absolute right-[5%] top-[60%] w-[20px] h-[20px] cursor-pointer' onClick={() => setShow(!show)} />
                        ) : (
                            <IoEye className='absolute right-[5%] top-[60%] w-[20px] h-[20px] cursor-pointer' onClick={() => setShow(!show)} />
                        )}

                        <button className='w-full h-[50px] bg-[#d9ad75] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold'>
                            {loading ? <Loading /> : "Create Account"}
                        </button>

                        <p className='flex gap-[10px]'>Already have an account? 
                            <span className='text-[black] text-[17px] font-semibold cursor-pointer' onClick={() => navigate("/login")}>
                                Login
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;
