import React, { useState } from 'react';
import { useChallenge } from '../hooks/useChallenge';

const Checkout: React.FC = () => {
  const { input: couponCode, handleInput: handleCouponCode } = useChallenge(5);
  const { input: cartData, handleInput: handleCartData } = useChallenge(13);
  const { input: price, handleInput: handlePrice } = useChallenge(15);
  const [total, setTotal] = useState(100);

  const applyCoupon = () => {
    if (couponCode === 'ADMIN100') {
      setTotal(0);
      console.log('Secret coupon applied!');
    }
  };

  const updateCart = () => {
    try {
      const cart = JSON.parse(cartData);
      console.log('Cart updated:', cart);
    } catch (error) {
      console.error('Invalid cart data');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="mb-4">
        <label className="block mb-2">Coupon Code</label>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => handleCouponCode(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={applyCoupon}
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
        >
          Apply Coupon
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Cart Data (JSON)</label>
        <textarea
          value={cartData}
          onChange={(e) => handleCartData(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter cart data in JSON format"
        />
        <button
          onClick={updateCart}
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
        >
          Update Cart
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Custom Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => handlePrice(e.target.value)}
          min="0"
          step="1"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mt-4">
        <p className="text-xl">Total: ${total}</p>
      </div>
    </div>
  );
};

export default Checkout;