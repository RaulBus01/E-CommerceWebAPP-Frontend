import { useEffect, useState } from 'react';
import { productData } from '../types/ProductType';
import { addProductCart, editProductQuantities, getCart, removeProductCart } from '../lib/api';

interface CartProduct {
  product: productData;
  quantity: number;
}

const useCart = (userId, token) => {

  const [cart, setCart] = useState<CartProduct[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getCart(userId, token);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setCart(res.cart);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };

    if (userId && token) {
      fetchCart();
    }
  }, [userId, token]);
  
  

  //scadare stock
  const editProductQuantity = async (userId, product, token, type) => {
    let quantity = product.quantity;
    let stock = product.product.stock;
    if (type == "increase") {
      quantity++;
      stock--;
    } else if (type == "decrease") {
      quantity--;
      stock++;
    }
    try {
      await editProductQuantities(userId, product, token, quantity, stock);
    } catch (err) {
      console.error('Failed to edit product quantity:', err);
    }
  }

  const addProductToCart = async (userId, product, token) => {
    try {
      await addProductCart(userId, product, token);
    } catch (err) {
      console.error('Failed to add product to cart:', err);
    }
  }


  const removeProduct = async (userId, product, token) => {
    try {
      await removeProductCart(userId, product, token);
    } catch (err) {
      console.error('Failed to remove product:', err);
    }
  }

  return { cart, setCart, editProductQuantity, removeProduct, addProductToCart };
};

export default useCart;