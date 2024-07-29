import { useEffect, useState } from 'react';

const useCart = (userId, token) => {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cart/find/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Token': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setCart(res);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };

    if (userId && token) {
      fetchCart();
    }
  }, [userId, token]);
  
  
  const editProductQuantity = async (userId, productId, token, quantity) => {
    try {
      await fetch(`http://localhost:3001/api/cart/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Token': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId, productId: productId._id, quantity: quantity }),
      });
    } catch (err) {
      console.error('Failed to edit product quantity:', err);
    }
  }

  const removeProduct = async (userId, productId, token) => {
    try {
      await fetch(`http://localhost:3001/api/cart/deleteProduct`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Token': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId, productId: productId._id }),
      });
    } catch (err) {
      console.error('Failed to remove product:', err);
    }
  }

  
  return { cart, editProductQuantity, removeProduct };
};

export default useCart;