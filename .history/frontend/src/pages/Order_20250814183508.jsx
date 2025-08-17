import React, { useContext, useEffect, useState } from "react";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import { authDataContext } from "../context/authContext";
import axios from "axios";

function Order() {
  const [orderData, setOrderData] = useState([]);
  const { currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  const loadOrderData = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${serverUrl}/api/order/userorder`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      let ordersArray = [];
      if (Array.isArray(data)) {
        ordersArray = data;
      } else if (data?.orders && Array.isArray(data.orders)) {
        ordersArray = data.orders;
      } else if (data?.data && Array.isArray(data.data)) {
        ordersArray = data.data;
      }

      const allOrdersItem = ordersArray.flatMap((order) =>
        (order.items || []).map((item) => ({
          ...item,
          _id: item._id || order._id,
          status: order.status || "Pending",
          payment: order.payment || "Unpaid",
          paymentMethod: order.paymentMethod || "Unknown",
          date: order.date || order.createdAt,
          image: item.image?.startsWith("http")
            ? item.image
            : `${serverUrl}/${item.image?.replace(/^\/+/, "")}`,
        }))
      );

      setOrderData(allOrdersItem);
    } catch (error) {
      console.error("❌ Order fetch error:", error.response?.data || error.message);
      setOrderData([]);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${serverUrl}/api/order/cancel`,
        { orderId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      loadOrderData();
    } catch (error) {
      console.error("❌ Cancel order error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="w-[99vw] min-h-[100vh] p-[20px] pb-[150px] overflow-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]">
      <div className="h-[8%] w-[100%] text-center mt-[80px]">
        <Title text1={"MY"} text2={"ORDER"} />
      </div>

      <div className="w-[100%] h-[92%] flex flex-wrap gap-[20px]">
        {orderData.length === 0 && (
          <p className="text-center text-white w-full mt-10">No orders found.</p>
        )}

        {orderData.map((item, index) => (
          <div key={index} className="w-[100%] border-t border-b py-2">
            <div className="flex items-start gap-6 bg-[#51808048] py-[10px] px-[20px] rounded-2xl relative">
              
              {/* Product Image */}
              <img
                src={item.image || "/placeholder.jpg"}
                alt={item.name || "Product"}
                className="w-[130px] h-[130px] rounded-md object-cover"
              />

              <div className="flex flex-col gap-[5px]">
                <p className="md:text-[25px] text-[20px] text-[#f3f9fc]">{item.name}</p>
                
                <div className="flex gap-5 items-center">
                  <p className="text-[#aaf4e7]">
                    {currency} {item.price}
                  </p>

                  {/* Cart Icon with Quantity */}
                  <p className="text-[#aaf4e7]">
                    Quantity: <span className="text-[#e4fbff]">{item.quantity}</span>
                  </p>
                </div>

                <p className="text-[#aaf4e7]">
                  Date:{" "}
                  <span className="text-[#e4fbff]">
                    {item.date ? new Date(item.date).toDateString() : "N/A"}
                  </span>
                </p>
                <p className="text-[#aaf4e7]">Payment Method: {item.paymentMethod}</p>

                <div className="absolute right-4 top-4 flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></span>
                  <p className="text-[#f3f9fc]">{item.status}</p>
                </div>

                <div className="flex gap-3 mt-2">
                  <button
                    className="px-3 py-1 rounded-md bg-[#101919] text-[#f3f9fc] text-sm active:bg-slate-500"
                    onClick={() => alert("Tracking order...")}
                  >
                    Track Order
                  </button>
                  <button
  onClick={() => cancelOrder(order._id)}
  className={`px-3 py-1 rounded ${
    order.status === "pending" ? "bg-red-600" : "bg-gray-400 cursor-not-allowed"
  }`}
  disabled={order.status !== "pending"}
>
  Cancel Order
</button>


                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
