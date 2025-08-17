import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authDataContext } from './authContext';
import { userDataContext } from './UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export const shopDataContext = createContext();

function ShopContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { userData } = useContext(userDataContext);
  const [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const currency = '₹';
  const delivery_fee = 40;

  // token sync
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // ✅ Get products
  const getProducts = useCallback(async () => {
    if (!serverUrl) return;
    try {
      const result = await axios.get(`${serverUrl}/api/product/list`);
      setProducts(result.data);
    } catch (error) {
      console.error("Get Products Error:", error);
    }
  }, [serverUrl]);

  // ✅ Add to cart
  const addtoCart = async (itemId) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    setCartItem(cartData);

    if (userData && token) {
      setLoading(true);
      try {
        await axios.post(
          `${serverUrl}/api/cart/add`,
          { itemId },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        );
      } catch (error) {
        console.error(error);
        toast.error("Add Cart Error");
      } finally {
        setLoading(false);
      }
    }
  };

  // ✅ Get user cart
  const getUserCart = useCallback(async () => {
    if (!token || !serverUrl) return;
    try {
      const result = await axios.post(
        `${serverUrl}/api/cart/get`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );
      setCartItem(result.data || {});
    } catch (error) {
      console.error("Get User Cart Error:", error);
    }
  }, [serverUrl, token]);

  // ✅ Update cart item quantity
  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId] = quantity;
    setCartItem(cartData);

    if (userData && token) {
      try {
        await axios.post(
          `${serverUrl}/api/cart/update`,
          { itemId, quantity },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  // ✅ Total cart items count
  const getCartCount = () => {
    return Object.values(cartItem).reduce((acc, qty) => acc + qty, 0);
  };

  // ✅ Total cart amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItem) {
      let itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo && cartItem[itemId] > 0) {
        totalAmount += itemInfo.price * cartItem[itemId];
      }
    }
    return totalAmount;
  };

  // Fetch products and cart
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getUserCart();
  }, [getUserCart]);

  let value = {
    products,
    currency,
    delivery_fee,
    getProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    addtoCart,
    getCartCount,
    setCartItem,
    updateQuantity,
    getCartAmount,
    loading,
    serverUrl,
    setToken,
    token
  };

  return (
    <shopDataContext.Provider value={value}>
      {children}
    </shopDataContext.Provider>
  );
}

export default ShopContextProvider;
