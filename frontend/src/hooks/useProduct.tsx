import { useEffect, useState } from 'react';

const useProduct = (productId) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/find/${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setProduct(res);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  return { product };
};

export default useProduct;1