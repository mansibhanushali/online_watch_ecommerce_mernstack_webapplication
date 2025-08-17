import React, { useContext, useState } from 'react';
import Title from '../component/Title';
import CartTotal from '../component/CartTotal';
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function PlaceOrder() {
  const [method] = useState('cod');
  const navigate = useNavigate();
  const { cartItem, setCartItem, getCartAmount, delivery_fee, products } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        method: method,
      };

      const token = localStorage.getItem("token");

      const result = await axios.post(
        serverUrl + "/api/order/placeorder",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      if (result.data) {
        setCartItem({});
        toast.success("Order Placed");
        navigate("/order");
      } else {
        toast.error("Order Placement Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[burlwood] to-[burlywood] flex items-center justify-center flex-col md:flex-row gap-[50px] relative'>
      {/* Form Section */}
      <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center mt-[90px]'>
        <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%]'>
          <div className='py-[10px]'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>
          <div className='flex gap-2 px-[10px] mb-4'>
            <input type="text" placeholder='First name' className='w-1/2 h-[50px] bg-[#d9ad75] text-black px-4 rounded-md' required onChange={onChangeHandler} name='firstName' value={formData.firstName} />
            <input type="text" placeholder='Last name' className='w-1/2 h-[50px] bg-[#d9ad75] text-black px-4 rounded-md' required onChange={onChangeHandler} name='lastName' value={formData.lastName} />
          </div>
          <div className='px-[10px] mb-4'>
            <input type="email" placeholder='Email address' className='w-full h-[50px] bg-[#d9ad75] text-black px-4 rounded-md' required onChange={onChangeHandler} name='email' value={formData.email} />
          </div>
          <div className='px-[10px] mb-4'>
            <input type="text" placeholder='Street' className='w-full h-[50px] bg-[#d9ad75] text-black px-4 rounded-md' required onChange={onChangeHandler} name='street' value={formData.street} />
          </div>
          <div className='flex gap-2 px-[10px] mb-4'>
            <input type="text" placeholder='City' className='w-1/2 h-[50px] bg-[#d9ad75] text-black px-4 rounded-md' required onChange={onChangeHandler} name='city' value={formData.city} />
            <input type="text" placeholder='State' className='w-1/2 h-[50px] bg-[#d9ad75] text-black px-4 rounded-md' required onChange={onChangeHandler} name='state' value={formData.state} />
          </div>
          <div className='flex gap-2 px-[10px] mb-4'>
            <input type="text" placeholder='Pincode' className='w-1/2 h-[50px] bg-[#d9ad75] text-black px-4 rounded-md' required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} />
            <input type="text" placeholder='Country' className='w-1/2 h-[50px] bg-[#d9ad75] text-black px-4 rounded-md' required onChange={onChangeHandler} name='country' value={formData.country} />
          </div>
          <div className='px-[10px] mb-4'>
            <input type="text" placeholder='Phone' className='w-full h-[50px] bg-[#d9ad75] text-black px-4 rounded-md' required onChange={onChangeHandler} name='phone' value={formData.phone} />
          </div>
          <div>
            <button type='submit' className='text-[18px] active:bg-[#d9ad75] cursor-pointer bg-[burlywood] py-[10px] px-[50px] rounded-2xl text-black border border-[black] ml-[30px] mt-[20px]'>
              {loading ? <Loading /> : "PLACE ORDER"}
            </button>
          </div>
        </form>
      </div>

      {/* Cart Summary */}
      <div className='lg:w-[50%] w-[100%] flex items-center justify-center flex-col'>
        <CartTotal />
        <div className='py-[10px]'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
        </div>
        <div className='mt-4'>
          <button className='bg-[#d9ad75] text-[black] font-bold py-2 px-6 rounded border-2 border-[black]'>
            CASH ON DELIVERY
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
