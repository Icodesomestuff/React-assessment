import React, { useEffect, useState } from "react";
import ProductCard from "./productCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const handleRemove = (id) => {
    setCart((prev) => {
      const currentCount = prev[id]?.count || 0;

      if (currentCount > 1) {
        return {
          ...prev,
          [id]: { ...products.find((item) => item.id === id), count: currentCount - 1 },
        };
      }

      if (currentCount === 1) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }

      return prev;
    });
  };

  const handleCartChange = (id) => {
    setCart((pre) => {
      let countVal = pre[id] ? pre[id].count + 1 : 1;
      return {
        ...pre,
        [id]: { ...products.find((item) => item.id === id), count: countVal },
      };
    });
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Products for Men and Women</h1>
      <div> 
        {/* Additional just to check my cart and its quantity working fine or not */}
        <h5>
          Cart Information 
          <ul>
          {Object.values(cart).map((item) => (
            <li key={item.id}>
              {item.title} , Quantity : {item.count}
            </li>
          ))}
          </ul>
        </h5>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddCart={handleCartChange}
            handleRemove={handleRemove}
            quantity={cart[product.id]?.count || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
