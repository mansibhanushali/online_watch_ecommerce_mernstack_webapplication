import React, { useContext, useState, useEffect, useRef } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import axios from 'axios';
import { authDataContext } from '../context/authContext';
import { shopDataContext } from '../context/ShopContext';

function Nav() {
  const { userData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
  const [showProfile, setShowProfile] = useState(false)
  const [showNav, setShowNav] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showCollectionMenu, setShowCollectionMenu] = useState(false)
  const navigate = useNavigate()
  const collectionRef = useRef()

  // Scroll hide logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close collection menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collectionRef.current && !collectionRef.current.contains(event.target)) {
        setShowCollectionMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      console.log(result.data)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className='w-[100vw] h-[70px] bg-[burlywood] z-10 fixed flex items-center justify-between px-[30px] shadow-md shadow-black transition-all duration-300'
      style={{ top: showNav ? '0' : '-100px' }}
    >
      <div className='w-[20%] lg:w-[30%] flex items-center justify-start gap-[10px] '>
        <img src={logo} alt="" className='w-[30px]' />
        <h1 className='text-[25px] text-[black] font-sans '>Wrist Watch</h1>
      </div>

      <div className='w-[50%] lg:w-[40%] hidden md:flex'>
        <ul className='flex items-center justify-center gap-[19px] text-[white] '>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/")}>HOME</li>

          {/* COLLECTIONS with Submenu */}
          <li className='relative' ref={collectionRef}>
            <button
              className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl'
              onClick={() => setShowCollectionMenu(prev => !prev)}
            >
              COLLECTIONS
            </button>

            {showCollectionMenu && (
              <ul className='absolute top-full left-0 mt-2 bg-white border rounded-lg shadow-md text-black w-[150px] z-10'>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/collection/men"); setShowCollectionMenu(false) }}>Men</li>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/collection/women"); setShowCollectionMenu(false) }}>Women</li>
                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/collection/kids"); setShowCollectionMenu(false) }}>Kids</li>
              </ul>
            )}
          </li>

          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/about")}>ABOUT</li>
          <li className='text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl' onClick={() => navigate("/contact")}>CONTACT</li>
        </ul>
      </div>

      <div className='w-[30%] flex items-center justify-end gap-[20px]'>
        {!showSearch && <IoSearchCircleOutline className='w-[38px] h-[38px] text-[#000000]  cursor-pointer' onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }} />}
        {showSearch && <IoSearchCircleSharp className='w-[38px] h-[38px] text-[#000000]  cursor-pointer' onClick={() => setShowSearch(prev => !prev)} />}
        {!userData && <FaCircleUser className='w-[29px] h-[29px] text-[#000000]  cursor-pointer' onClick={() => setShowProfile(prev => !prev)} />}
        {userData && <div className='w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full flex items-center justify-center cursor-pointer' onClick={() => setShowProfile(prev => !prev)}>{userData?.name.slice(0, 1)}</div>}
        <MdOutlineShoppingCart className='w-[30px] h-[30px] text-[#000000]  cursor-pointer hidden md:block' onClick={() => navigate("/cart")} />
        <p className='absolute w-[18px] h-[18px] items-center  justify-center bg-black px-[5px] py-[2px] text-white  rounded-full text-[9px] top-[10px] right-[23px] hidden md:block'>{getCartCount()}</p>
      </div>

      {showSearch && (
        <div className='w-[100%]  h-[80px] bg-[burlywood] absolute top-[100%] left-0 right-0 flex items-center justify-center'>
          <input type="text" className='lg:w-[50%] w-[80%] h-[60%] bg-[burlywood] rounded-[30px] px-[50px] placeholder:text-white text-[white] text-[18px] border-2 border-black' placeholder='Search Here' onChange={(e) => { setSearch(e.target.value) }} value={search} />
        </div>
      )}

      {showProfile && (
        <div className='absolute w-[220px] h-[150px] bg-[white] top-[110%] right-[4%] border-[1px] border-[black] rounded-[10px] z-10'>
          <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[17px] py-[10px] text-[black]'>
            {!userData && <li className='w-[100%] hover:bg-[#burlywood]  px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/login"); setShowProfile(false) }}>Login</li>}
            {userData && <li className='w-[100%] hover:bg-[#burlywood]  px-[15px] py-[10px] cursor-pointer' onClick={() => { handleLogout(); setShowProfile(false) }}>LogOut</li>}
            <li className='w-[100%] hover:bg-[#burlywood]  px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/order"); setShowProfile(false) }} >Orders</li>
            <li className='w-[100%] hover:bg-[#burlywood]  px-[15px] py-[10px] cursor-pointer' onClick={() => { navigate("/about"); setShowProfile(false) }} >About</li>
          </ul>
        </div>
      )}

      {/* Mobile Bottom Nav */}
      <div className='w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[burlywood] md:hidden'>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/")}><IoMdHome className='w-[28px] h-[28px] text-[white] md:hidden' /> Home</button>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("collection")}><HiOutlineCollection className='w-[28px] h-[28px] text-[white] md:hidden' /> Collections</button>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px] ' onClick={() => navigate("/contact")}><MdContacts className='w-[28px] h-[28px] text-[white] md:hidden' />Contact</button>
        <button className='text-[white] flex items-center justify-center flex-col gap-[2px]' onClick={() => navigate("/cart")}><MdOutlineShoppingCart className='w-[28px] h-[28px] text-[white] md:hidden' /> Cart</button>
        <p className='absolute w-[18px] h-[18px] flex items-center justify-center bg-white px-[5px] py-[2px] text-black font-semibold  rounded-full text-[9px] top-[8px] right-[18px]'>{getCartCount()}</p>
      </div>
    </div>
  )
}

export default Nav
