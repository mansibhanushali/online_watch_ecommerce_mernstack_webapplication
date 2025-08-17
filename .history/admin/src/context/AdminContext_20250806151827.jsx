import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const adminDataContext = createContext()

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null)
  const { serverUrl } = useContext(authDataContext)
  const navigate = useNavigate()

  const getAdmin = async () => {
    try {
      const baseUrl = serverUrl || "http://localhost:8000"  // ✅ fallback

      const result = await axios.get(baseUrl + "/api/user/getadmin", {
        withCredentials: true
      })

      setAdminData(result.data)
      console.log("Admin fetched:", result.data)

      // ✅ Navigate only if on login or root (optional safety)
      const currentPath = window.location.pathname
      if (currentPath === "/admin" || currentPath === "/admin/login") {
        navigate("/admin/home")
      }

    } catch (error) {
      setAdminData(null)
      console.error("Error fetching admin:", error?.response?.data || error.message)
    }
  }

  useEffect(() => {
    getAdmin()
  }, [])

  return (
    <adminDataContext.Provider value={{ adminData, setAdminData, getAdmin }}>
      {children}
    </adminDataContext.Provider>
  )
}

export default AdminContext
