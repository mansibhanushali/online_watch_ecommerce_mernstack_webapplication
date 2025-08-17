// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import AuthContext from './context/authContext.jsx';
import UserContextProvider from './context/UserContext.jsx';
import ShopContext from './context/ShopContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <UserContextProvider>
          <ShopContext>
            <App />
          </ShopContext>
        </UserContextProvider>
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);
