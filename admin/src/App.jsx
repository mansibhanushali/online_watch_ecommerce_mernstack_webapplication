import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Lists from './pages/Lists';
import Orders from './pages/Orders';
import Login from './pages/Login';
import { adminDataContext } from './context/AdminContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const { adminData } = useContext(adminDataContext);

  if (adminData === undefined) {
    // ⏳ While checking admin status
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            adminData ? <Navigate to="/admin/home" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            adminData ? <Navigate to="/admin/home" /> : <Login />
          }
        />
        <Route
          path="/admin/home"
          element={
            adminData ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/add"
          element={
            adminData ? <Add /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/lists"
          element={
            adminData ? <Lists /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/orders"
          element={
            adminData ? <Orders /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
