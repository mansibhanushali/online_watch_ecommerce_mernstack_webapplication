import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const adminDataContext = createContext();

function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(authDataContext);

  const getAdmin = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        console.log("No admin token found");
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const result = await axios.get(serverUrl + "/api/user/getadmin", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });

      setAdminData(result.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error fetching admin:", error);
      setIsAuthenticated(false);
      setAdminData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  const value = { adminData, setAdminData, getAdmin, isAuthenticated, loading };

  return (
    <adminDataContext.Provider value={value}>
      {children}
    </adminDataContext.Provider>
  );
}

export default AdminContext;
