import React, { useContext } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';
import { useParams } from 'react-router-dom';

function Collections() {
  const { category } = useParams();
  const selectedCategory = category || 'Mens';

  const { products } = useContext(shopDataContext);

  const filteredProducts = products.filter(
    (product) =>
      product.category?.toLowerCase() === selectedCategory.toLowerCase()
  );

  return (
    <div className="px-4 md:px-8 lg:px-20 py-8 min-h-screen bg-[burlywood] text-black">
      <Title title={`${selectedCategory} Collection`} />

      {/* Product Cards */}
      <div className="flex flex-wrap gap-6 justify-center mt-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))
        ) : (
          <p className="text-center text-black">
            No products found in {selectedCategory} category.
          </p>
        )}
      </div>
    </div>
  );
}

export default Collections;
