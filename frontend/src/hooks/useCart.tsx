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
  
  
  const editProductQuantity = async (userId, product, token, quantity) => {
    try {
      await fetch(`http://localhost:3001/api/cart/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Token': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId, productId: product._id, quantity: quantity }),
      });
    } catch (err) {
      console.error('Failed to edit product quantity:', err);
    }
  }

  const addProductToCart = async (userId, product, token) => {
    try {
      await fetch(`http://localhost:3001/api/cart/add`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Token': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId, productId: product._id, quantity: 1 }),
      });
    } catch (err) {
      console.error('Failed to add product to cart:', err);
    }
  }


  const removeProduct = async (userId, product, token) => {
    try {
      await fetch(`http://localhost:3001/api/cart/deleteProduct`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Token': `Bearer ${token}`,
        },
        body: JSON.stringify({ id: userId, productId: product._id }),
      });
    } catch (err) {
      console.error('Failed to remove product:', err);
    }
  }

  return { cart, editProductQuantity, removeProduct, addProductToCart };
};

export default useCart;