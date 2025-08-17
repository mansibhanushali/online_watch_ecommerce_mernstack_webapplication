// src/context/AuthContext.jsx

import React, { createContext } from 'react';
import axios from 'axios'; 

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000"; 


  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = serverUrl;

  const value = {
    serverUrl,
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;