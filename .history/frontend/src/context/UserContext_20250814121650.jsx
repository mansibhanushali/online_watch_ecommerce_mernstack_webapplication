// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './authContext';
import axios from 'axios';

export const userDataContext = createContext();

function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        setUserData(null);
        return;
      }

      const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Send JWT in header
        },
        withCredentials: true,
      });

      if (result.data?.success) {
        setUserData(result.data.user);
      } else {
        setUserData(null);
      }
    } catch (error) {
      setUserData(null);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
      }
      console.error("Error fetching user:", error.response?.data || error);
    }
  };

  // ✅ Page load pe aur jab token change ho tab user fetch karo
  useEffect(() => {
    getCurrentUser();
  }, []);

  // ✅ Token change hone pe user fetch karo
  useEffect(() => {
    const handleStorageChange = () => {
      getCurrentUser();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContextProvider;
