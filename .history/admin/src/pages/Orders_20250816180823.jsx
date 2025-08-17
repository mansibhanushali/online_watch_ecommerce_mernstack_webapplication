import React, { useState, useEffect, useContext } from 'react';
import Nav from '../component/Nav';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { SiEbox } from "react-icons/si";

function Orders() {
  let [orders, setOrders] = useState([]);
  let { serverUrl } = useContext(authDataContext);

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true });
      setOrders(result.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true });
      if (result.data) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[burlwood] to-[burlywood] text-black'>
      <Nav />
      <div className='w-full px-4 md:px-12 mt-[70px] py-[50px]'>
        <h2 className='text-[28px] md:text-[40px] mb-[30px]'>All Orders List</h2>
        {
          orders.map((order, index) => (
            <div key={index} className='w-full bg-slate-600 rounded-xl flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 md:p-6 mb-6 gap-4'>
              <SiEbox className='w-[60px] h-[60px] text-black p-[5px] rounded-lg bg-white' />

              <div>
                <div className='text-[#56dbfc] text-[16px] flex flex-col gap-1'>
                  {
                    order.items.map((item, idx) => (
                      <p key={idx}>
                        {(item?.name || "").toUpperCase()} * {item?.quantity || 0} <span>{item?.size || ""}</span>
                        {idx !== order.items.length - 1 && ','}
                      </p>
                    ))
                  }
                </div>
                <div className='text-green-100 text-[15px] mt-2'>
                  <p>{order.address.firstName + " " + order.address.lastName}</p>
                  <p>{order.address.street}</p>
                  <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.pinCode}</p>
                  <p>{order.address.phone}</p>
                </div>
              </div>

              <div className='text-green-100 text-[15px]'>
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p className='text-[20px] text-white'>₹ {order.amount}</p>
              </div>

              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className='px-3 py-2 bg-slate-500 rounded-lg border border-[black] text-white'
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Orders;
