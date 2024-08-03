import { useEffect, useState } from 'react';
import { productData } from '../types/ProductType';
import { _post, _get, _put, _delete } from '../utils/api';

interface CartProduct {
  product: productData;
  quantity: number;
}

const useCart = (token:string) => {
 
  const [cart, setCart] = useState<{ products: CartProduct[] }>({ products: [] });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await _get(`/cart/find`, token);
        setCart(response.cart);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };

    if (token) {
      fetchCart();
    }
  }, [token]);

  const editProductQuantity = async (product,type) => {
    let quantity = product.quantity;
    let stock = product.product.stock;
    console.log(token);

    if (type === "increase" && stock > 0) {
      quantity++;
      stock--;
    } else if (type === "decrease" && quantity > 0) {
      quantity--;
      stock++;
    }

    try {
      await _put(`/cart/edit`, {productId: product.product._id, quantity },  token );
    } catch (err) {
      console.error('Failed to edit product quantity:', err);
    }
  };

  const addProductToCart = async ( product, token) => {
    try {
      await _put(`/cart/add`, { productId: product._id, quantity: 3 },  token );
    } catch (err) {
      console.error('Failed to add product to cart:', err);
    }
  };

  const removeProduct = async (product, token) => {
    try {
      await _delete(`/cart/deleteProduct`, { productId: product._id },  token );
      const updatedCart = cart.products.filter(item => item.product._id !== product._id);
      setCart({ ...cart, products: updatedCart });
    } catch (err) {
      console.error('Failed to remove product:', err);
    }
  };

  return { cart, setCart, editProductQuantity, removeProduct, addProductToCart };
};

export default useCart;
