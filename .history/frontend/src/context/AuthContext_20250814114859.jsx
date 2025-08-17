// src/context/AuthContext.jsx
import React, { createContext, useReducer, useEffect } from "react";
import axios from "axios";

// Initial auth state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Reducer for auth actions
function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return { user: null, token: null, isAuthenticated: false };
    default:
      return state;
  }
}

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000";

  // Load from localStorage if available
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return token && user
      ? { token, user: JSON.parse(user), isAuthenticated: true }
      : initialState;
  });

  // Set axios defaults and persist token/user
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = serverUrl;

    if (state.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [state.token]);

  // Context actions
  const login = (payload) => dispatch({ type: "LOGIN", payload });
  const logout = () => dispatch({ type: "LOGOUT" });

  const value = {
    serverUrl,
    ...state,
    login,
    logout,
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
