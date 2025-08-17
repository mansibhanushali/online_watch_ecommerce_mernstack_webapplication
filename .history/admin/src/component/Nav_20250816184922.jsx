import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo1 from "../assets/logo1.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

// Icons
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { AiOutlineHome } from "react-icons/ai"; // ✅ Home icon

function Nav() {
    let navigate = useNavigate()
    let { serverUrl } = useContext(authDataContext)
    let { setAdmin } = useContext(adminDataContext)

    const logOut = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            console.log(result.data)
            toast.success("LogOut Successfully")
            setAdmin(null)
            navigate("/admin/login")
        } catch (error) {
            console.log(error)
            toast.error("LogOut Failed")
        }
    }

    return (
        <div className='w-[100vw] h-[70px] bg-[burlywood] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black'>

            {/* Left Logo */}
            <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={() => navigate("/")}>
                <img src={logo1} alt="" className='w-[40px]' />
                <h1 className='text-[35px] text-[black] font-sans'>Wrist Watch</h1>
            </div>

            {/* Center Navigation Buttons */}
            <div className='flex gap-4'>
                {/* ✅ Fixed Home button */}
                <button
                    className='bg-[burlywood] border border-black text-black px-4 py-2 rounded hover:brightness-90 flex items-center gap-2 text-[15px]'
                    onClick={() => navigate('/')}
                >
                    <AiOutlineHome className='w-[18px] h-[18px]' />
                    Home
                </button>

                <button
                    className='bg-[burlywood] border border-black text-black px-4 py-2 rounded hover:brightness-90 flex items-center gap-2 text-[15px]'
                    onClick={() => navigate('/add')}
                >
                    <IoIosAddCircleOutline className='w-[18px] h-[18px]' />
                    Add Products
                </button>

                <button
                    className='bg-[burlywood] border border-black text-black px-4 py-2 rounded hover:brightness-90 flex items-center gap-2 text-[15px]'
                    onClick={() => navigate('/lists')}
                >
                    <FaRegListAlt className='w-[18px] h-[18px]' />
                    Products List
                </button>

                <button
                    className='bg-[burlywood] border border-black text-black px-4 py-2 rounded hover:brightness-90 flex items-center gap-2 text-[15px]'
                    onClick={() => navigate('/orders')}
                >
                    <SiTicktick className='w-[18px] h-[18px]' />
                    All Orders
                </button>
            </div>

            {/* Right Exit Button */}
            <button
                className='text-[15px] border border-black cursor-pointer bg-[burlywood] py-[10px] px-[20px] text-black rounded hover:brightness-90'
                onClick={logOut}
            >
                Logout
            </button>
        </div>
    )
}

export default Nav
