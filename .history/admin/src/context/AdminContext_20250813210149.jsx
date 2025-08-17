import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // or check cookie if needed
      if (!token) {
        console.log("No admin token, skipping admin fetch");
        return;
      }

      const result = await axios.get(serverUrl + "/api/user/getadmin", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });

      setAdminData(result.data);
      console.log("Admin data:", result.data);
    } catch (error) {
      setAdminData(null);
      console.error("Error fetching admin:", error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const value = { adminData, setAdminData, getAdmin };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
