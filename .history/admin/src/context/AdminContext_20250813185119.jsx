import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  // ✅ Always set axios baseURL here for admin API calls
  axios.defaults.baseURL = serverUrl || "http://localhost:8000";
  axios.defaults.withCredentials = true;

  const getAdmin = async () => {
    try {
      const result = await axios.get("/api/user/getadmin");

      setAdminData(result.data);
      console.log("Admin fetched:", result.data);

      // ✅ Redirect only when needed
      const currentPath = window.location.pathname;
      if (currentPath === "/login" || currentPath === "/") {
        navigate("/home");
      }

    } catch (error) {
      setAdminData(null);
      console.error("Error fetching admin:", error?.response?.data || error.message);
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
