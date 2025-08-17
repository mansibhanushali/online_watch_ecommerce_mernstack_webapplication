import React, { useState, useEffect, useContext } from 'react';
import Nav from '../component/Nav';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const { serverUrl } = useContext(authDataContext);

  const fetchCounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const productsRes = await axios.get(`${serverUrl}/api/product/list`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTotalProducts(productsRes.data.length || 0);

      const ordersRes = await axios.post(`${serverUrl}/api/order/list`, {}, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setTotalOrders(ordersRes.data.length || 0);
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[burlwood] to-[burlywood] text-black">
      <Nav />

      <div className="w-full flex flex-col items-start justify-start px-4 md:px-20 gap-10 py-24">
        <h1 className="text-3xl md:text-4xl text-[black] font-bold">
          Wristwatch Admin Dashboard
        </h1>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Products Count Card */}
          <div className="w-full md:w-1/2 h-[200px] bg-[#0000002e] text-[black] border-2 border-[black] rounded-lg shadow shadow-burlywood backdrop-blur-lg flex flex-col items-center justify-center gap-4 text-xl md:text-2xl">
            <p>Total Products</p>
            <span className="px-6 py-2 bg-[burlywood] rounded-lg border border-[black]">
              {totalProducts}
            </span>
          </div>

          {/* Orders Count Card */}
          <div className="w-full md:w-1/2 h-[200px] bg-[#0000002e] text-[black] border-2 border-[black] rounded-lg shadow shadow-burlywood backdrop-blur-lg flex flex-col items-center justify-center gap-4 text-xl md:text-2xl">
            <p>Total Orders</p>
            <span className="px-6 py-2 bg-[burlywood] rounded-lg border border-[black]">
              {totalOrders}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
