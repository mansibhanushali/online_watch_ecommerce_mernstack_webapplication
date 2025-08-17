// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './authContext';
import axios from 'axios';

export const userDataContext = createContext();

function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl, token } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      if (!token) {
        setUserData(null);
        return;
      }

      const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        headers: { Authorization: `Bearer ${token}` },
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
    }
  };

  // 🔹 Page load pe and token change pe call
  useEffect(() => {
    getCurrentUser();
  }, [token]);

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContextProvider;
