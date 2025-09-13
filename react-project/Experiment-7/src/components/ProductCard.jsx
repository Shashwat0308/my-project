import React from 'react';
import './ProductCard.css';

function ProductCard({ name, price, inStock }) {
  return (
    <div className="product-card">
      {/* This line displays the product name */}
      <h3 className="product-name">{name}</h3>

      {/* This line adds the "Price:" label */}
      <p className="product-price">Price: ${price}</p>
      
      <p className={inStock ? 'in-stock' : 'out-of-stock'}>
        Status: {inStock ? 'In Stock' : 'Out of Stock'}
      </p>
    </div>
  );
}

export default ProductCard;

