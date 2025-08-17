import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

function ProductDetail() {
  const { productId } = useParams()
  const { products, addtoCart, currency } = useContext(shopDataContext)
  const [productData, setProductData] = useState(null)

  useEffect(() => {
    const matchedProduct = products.find((item) => item._id === productId)
    if (matchedProduct) {
      setProductData(matchedProduct)
    }
  }, [productId, products])

  const handleAddToCart = () => {
    addtoCart(productData._id)
    toast.success('Product added to cart!')
  }

  return productData ? (
    <div className='min-h-screen flex flex-col md:flex-row gap-8 bg-gradient-to-l from-[burlwood] to-[burlywood] p-4 md:p-16 text-black'>
      <div className='w-full md:w-[50%]'>
        <img
          src={productData.image}
          alt={productData.name}
          className='w-full rounded-lg object-cover max-h-[300px] border border-[black]'
        />
      </div>

      <div className='w-full md:w-[50%] flex flex-col gap-6'>
        <h1 className='text-2xl font-bold'>{productData.name}</h1>
        <p className='text-lg'>{currency} {productData.price}</p>
        <p className='text-sm text-black'>{productData.description}</p>

        <button
          onClick={handleAddToCart}
          className='mt-6 bg-[#e1c6a4] border border-[black] text-black px-6 py-3 rounded hover:opacity-90'
        >
          Add to Cart
        </button>
      </div>
    </div>
  ) : (
    <div className='min-h-screen flex items-center justify-center text-black bg-[#d9ad75]'>
      Loading product...
    </div>
  )
}

export default ProductDetail
