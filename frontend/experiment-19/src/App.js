import React from 'react';
import ProductList from './productionlist';
import Cart from './cart';

function App() {
  return (
    <div>
      <h1>Shopping Cart with Redux Toolkit</h1>
      <ProductList />
      <Cart />
    </div>
  );
}

export default App;
