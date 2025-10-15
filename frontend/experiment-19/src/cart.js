import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './features/cart/cartSlice';

function Cart() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 && <p>Cart is empty</p>}
      {items.map(item => (
        <div key={item.id}>
          <b>{item.name}</b> - ${item.price} x{' '}
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={e => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))}
          />
          <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
