import React, { createContext, useContext, useEffect, useState } from 'react';
import { authDataContext } from './authContext';
import axios from 'axios';
import { userDataContext } from './UserContext';
import { toast } from 'react-toastify';

// ✅ Context create kiya
export const shopDataContext = createContext();

function ShopContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const { userData } = useContext(userDataContext);
  const [showSearch, setShowSearch] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(false);
  const currency = '₹';
  const delivery_fee = 40;
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const getProducts = React.useCallback(async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [serverUrl]);

  const addtoCart = async (itemId) => {
    let cartData = structuredClone(cartItem);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItem(cartData);

    if (userData) {
      setLoading(true);
      try {
        await axios.post(
          serverUrl + "/api/cart/add",
          { itemId },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        );
      } catch (error) {
        console.log(error);
        toast.error("Add Cart Error");
      } finally {
        setLoading(false);
      }
    }
  };

  const getUserCart = React.useCallback(async () => {
    try {
      const result = await axios.post(
        serverUrl + '/api/cart/get',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );
      setCartItem(result.data);
    } catch (error) {
      console.log(error);
    }
  }, [serverUrl, token]);

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItem);
    cartData[itemId] = quantity;
    setCartItem(cartData);

    if (userData) {
      try {
        await axios.post(
          serverUrl + "/api/cart/update",
          { itemId, quantity },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItem) {
      if (cartItem[itemId] > 0) {
        totalCount += cartItem[itemId];
      }
    }
    return totalCount;
  };

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
