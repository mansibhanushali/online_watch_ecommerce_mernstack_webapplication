// src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const userDataContext = createContext();

function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      // ✅ Cookie-based request
      const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
        withCredentials: true, // Cookie automatically send होगी
      });

      if (result.data?.success) {
        setUserData(result.data.user);
      } else {
        setUserData(null);
      }
    } catch (error) {
      setUserData(null);
      console.error("getCurrentUser error:", error);
    }
  };

  // 🔹 Page load pe call
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, getCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContextProvider;
