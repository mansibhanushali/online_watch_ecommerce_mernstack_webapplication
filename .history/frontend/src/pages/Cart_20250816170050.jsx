import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItem) {
      if (cartItem[itemId] > 0) {
        tempData.push({
          _id: itemId,
          quantity: cartItem[itemId],
        });
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className='w-[99vw] min-h-[100vh] p-[20px] overflow-hidden bg-gradient-to-l from-[burlwood] to-[burlywood]'>
      <div className='h-[8%] w-[100%] text-center mt-[80px]'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
        {cartData.map((item, index) => {
          const productData = products.find((product) => String(product._id) === String(item._id));


          if (!productData) return null;

          return (
            <div key={index} className='w-[100%] h-[10%] border-t border-b'>
              <div className='w-[100%] h-[80%] flex items-start gap-6 bg-[burlywood] py-[10px] px-[20px] rounded-2xl relative'>
                <img className='w-[100px] h-[100px] rounded-md' src={productData.image} alt={productData.name} />
                <div className='flex items-start justify-center flex-col gap-[10px]'>
                  <p className='md:text-[25px] text-[20px] text-[black]'>{productData.name}</p>
                  <p className='text-[20px] text-[black]'>{currency} {productData.price}</p>
                </div>

                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  className='md:max-w-20 max-w-10 md:px-2 md:py-2 py-[5px] px-[10px] text-[black] text-[18px] font-semibold bg-[#518080b4] absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border-[1px] border-[#9ff9f9] rounded-md'
                  onChange={(e) => {
                    const newQty = Number(e.target.value);
                    if (newQty > 0) {
                      updateQuantity(item._id, newQty);
                    }
                  }}
                />

                <RiDeleteBin6Line
                  className='text-[#9ff9f9] w-[25px] h-[25px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1'
                  onClick={() => updateQuantity(item._id, 0)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className='flex justify-start items-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <button
            className='text-[18px] hover:bg-slate-500 cursor-pointer bg-[#51808048] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] ml-[30px] mt-[20px]'
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder");
              } else {
                console.log("Your cart is empty!");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
