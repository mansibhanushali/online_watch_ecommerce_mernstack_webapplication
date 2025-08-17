import React, { useContext, useState } from 'react';
import Nav from '../component/Nav';
import upload from '../assets/upload image.jpg';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Add() {
  const [image1, setImage1] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Men');
  const [price, setPrice] = useState('');
  const [bestseller, setBestSeller] = useState(false);
  const [loading, setLoading] = useState(false);

  const { serverUrl } = useContext(authDataContext);

  const handleAddProduct = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('bestseller', bestseller);
      formData.append('image', image1);

      const result = await axios.post(`${serverUrl}/api/product/addproduct`, formData, {
        withCredentials: true,
      });

      toast.success('Product added successfully');
      setLoading(false);

      if (result.data) {
        setName('');
        setDescription('');
        setImage1(false);
        setPrice('');
        setBestSeller(false);
        setCategory('Men');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to add product');
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] text-white'>
      <Nav />

      <form
        onSubmit={handleAddProduct}
        className='max-w-5xl mx-auto mt-20 px-4 py-12 flex flex-col gap-10'
      >
        <h1 className='text-3xl md:text-4xl font-semibold'>Add Product Page</h1>

        <div className='flex flex-col gap-3'>
          <label className='text-xl font-semibold'>Upload Image</label>
          <label htmlFor='image1' className='w-24 h-24 md:w-28 md:h-28 cursor-pointer'>
            <img
              src={!image1 ? upload : URL.createObjectURL(image1)}
              alt='preview'
              className='w-full h-full rounded-lg border-2 border-gray-300 object-cover'
            />
            <input
              type='file'
              id='image1'
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
              required
            />
          </label>
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-xl font-semibold'>Product Name</label>
          <input
            type='text'
            placeholder='Type here'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className='bg-slate-600 border-2 border-gray-400 rounded-lg px-4 py-2 placeholder:text-white'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-xl font-semibold'>Product Description</label>
          <textarea
            placeholder='Type here'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='bg-slate-600 border-2 border-gray-400 rounded-lg px-4 py-3 h-24 placeholder:text-white'
          />
        </div>

        <div className='flex flex-col md:flex-row gap-6'>
          <div className='flex flex-col gap-2'>
            <label className='text-xl font-semibold'>Product Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='bg-slate-600 border-2 border-gray-400 rounded-lg px-4 py-2'
            >
              <option value='Men'>Men</option>
              <option value='Women'>Women</option>
              <option value='Kids'>Kids</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-xl font-semibold'>Product Price</label>
            <input
              type='number'
              placeholder='₹2000'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className='bg-slate-600 border-2 border-gray-400 rounded-lg px-4 py-2 placeholder:text-white'
            />
          </div>
        </div>

        <div className='flex items-center gap-3 mt-4'>
          <input
            type='checkbox'
            id='checkbox'
            className='w-5 h-5'
            checked={bestseller}
            onChange={() => setBestSeller((prev) => !prev)}
          />
          <label htmlFor='checkbox' className='text-lg font-semibold'>
            Add to BestSeller
          </label>
        </div>

        <button
          type='submit'
          className='w-44 py-3 bg-[#65d8f7] rounded-xl text-black font-semibold hover:bg-[#45c1e4] transition'
        >
          {loading ? <Loading /> : 'Add Product'}
        </button>
      </form>
    </div>
  );
}

export default Add;
