import React, { useState } from 'react';

const ProductCard = ({ product , handleAddCart , handleRemove , quantity}) => {
 console.log(product?.id)

  return (
    <div className="bg-white border rounded shadow p-4 text-center">
      <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <p className="text-green-500 font-bold mb-4">Rs {product.price}</p>
      <div className="flex items-center justify-center mb-4">
        <button onClick={()=> handleRemove(product?.id)} className="px-2 py-1 border">-</button>
        <span className="px-4">{quantity}</span>
        <button onClick={()=> handleAddCart(product?.id)} className="px-2 py-1 border">+</button>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> handleAddCart(product?.id) } >Add to Cart</button>
    </div>
  );
};

export default ProductCard;
