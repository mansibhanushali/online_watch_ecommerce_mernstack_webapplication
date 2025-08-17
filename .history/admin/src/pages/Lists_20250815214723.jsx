import React, { useContext, useEffect, useState } from 'react';
import Nav from '../component/Nav';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';

function Lists() {
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const { serverUrl } = useContext(authDataContext);

  const fetchList = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/product/list");
      setList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeList = async (id) => {
    try {
      const result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true });
      if (result.data) fetchList();
      else console.log("Failed to remove Product");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setEditData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price
    });
  };

  const handleSave = async (id) => {
    try {
      const result = await axios.put(`${serverUrl}/api/product/update/${id}`, editData, {
        withCredentials: true
      });
      if (result.data.success) {
        setEditingId(null);
        fetchList();
      } else {
        console.log("Failed to update product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[burlwood] to-[burlywood] text-black'>
      <Nav />
      <div className='w-full mt-[90px] px-4 py-8 flex flex-col items-center gap-[30px]'>
        <h2 className='text-[28px] md:text-[40px] mb-[10px] text-center'>All Listed Products</h2>

        {list?.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className='w-full max-w-[800px] md:h-auto bg-[#e1c6a4] rounded-xl flex flex-col md:flex-row items-center justify-start gap-[10px] md:gap-[30px] p-[10px] md:px-[30px] border-2 border-[black]'
            >
              <img 
                src={item.image} 
                alt={item.name} 
                className='w-[80px] h-[80px] md:w-[120px] md:h-[100px] rounded-lg object-cover' 
              />

              {editingId === item._id ? (
                <div className='flex-1 flex flex-col gap-1'>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className='text-black rounded px-2 py-1'
                  />
                  <input
                    type="text"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    className='text-black rounded px-2 py-1'
                  />
                  <input
                    type="text"
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    className='text-black rounded px-2 py-1'
                  />
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                    className='text-black rounded px-2 py-1'
                  />
                </div>
              ) : (
                <div className='flex-1 flex flex-col justify-center'>
                  <div className='text-[15px] md:text-[20px] text-[black]'>{item.name}</div>
                  <div className='text-[13px] md:text-[17px] text-[black]'>{item.description}</div>
                  <div className='text-[13px] md:text-[17px] text-[black]'>{item.category}</div>
                  <div className='text-[13px] md:text-[17px] text-[black]'>₹{item.price}</div>
                </div>
              )}

              <div className='flex gap-2 flex-col md:flex-row'>
                {editingId === item._id ? (
                  <button
                    onClick={() => handleSave(item._id)}
                    className='text-black bg-white hover:bg-green-400 px-3 py-1 rounded-md text-sm md:text-base'
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(item)}
                    className='text-black bg-white hover:bg-yellow-300 px-3 py-1 rounded-md text-sm md:text-base'
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => removeList(item._id)}
                  className='text-black bg-white hover:bg-burlywood px-3 py-1 rounded-md text-sm md:text-base'
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className='text-black text-lg'>No products available.</div>
        )}
      </div>
    </div>
  );
}

export default Lists;
