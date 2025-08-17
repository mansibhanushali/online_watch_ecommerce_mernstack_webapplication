import React, { useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Registration from './pages/Registration';
import Home from './pages/Home';
import Login from './pages/Login';
import Nav from './component/Nav';
import { userDataContext } from './context/UserContext';
import About from './pages/About';
import Collections from './pages/Collections';
import Product from './pages/Product';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import { ToastContainer } from 'react-toastify';
import NotFound from './pages/NotFound';

function App() {
  const { userData } = useContext(userDataContext);
  const location = useLocation();

  // Protected route wrapper
  const ProtectedRoute = (Component) => {
    return userData ? (
      Component
    ) : (
      <Navigate to="/login" state={{ from: location.pathname }} />
    );
  };

  return (
    <>
      <ToastContainer />
      <Nav />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/collection/:category" element={<Collections />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            userData ? (
              <Navigate to={location.state?.from || '/'} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            userData ? (
              <Navigate to={location.state?.from || '/'} />
            ) : (
              <Registration />
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/productdetail/:productId"
          element={ProtectedRoute(<ProductDetail />)}
        />
        <Route path="/cart" element={ProtectedRoute(<Cart />)} />
        <Route path="/placeorder" element={ProtectedRoute(<PlaceOrder />)} />
        <Route path="/order" element={ProtectedRoute(<Order />)} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
