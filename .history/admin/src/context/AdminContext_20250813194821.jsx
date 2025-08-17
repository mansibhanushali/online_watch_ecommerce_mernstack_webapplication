import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  // ✅ Configure Axios globally for admin API calls
  axios.defaults.baseURL = serverUrl || "http://localhost:8000";
  axios.defaults.withCredentials = true;

  const getAdmin = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.warn("No admin token found, redirecting to login...");
        navigate("/login");
        return;
      }

      const result = await axios.get("/api/admin/getadmin", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Matches adminAuth middleware
        },
      });

      setAdminData(result.data);
      console.log("✅ Admin fetched:", result.data);

      // Redirect if admin opens login page while logged in
      if (["/login", "/"].includes(window.location.pathname)) {
        navigate("/home");
      }

    } catch (error) {
      setAdminData(null);
      console.error("❌ Error fetching admin:", error?.response?.data || error.message);

      // Redirect to login if token invalid or expired
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <adminDataContext.Provider value={{ adminData, setAdminData, getAdmin }}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
