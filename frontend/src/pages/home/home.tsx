import React, { useCallback, useEffect, useState } from "react";
import "./home.css";
import useProduct from '../../hooks/useProduct';
import ProductCard from '../../components/product-card/product-card';
import ProductSlider from "../../components/product-slider/product-slider";
import { productData } from "../../types/ProductType";
import Spinner from "../../components/spinner/spinner";
import useFavourite from "../../hooks/useFavourite";
import { useAuth } from "../../hooks/useAuth";


const Home = () => {
  const { products, loading } = useProduct();
  const { token } = useAuth();
  const { addToFavourite, removeFavourite, isProductFavourite } = useFavourite(token as string);

  const [favouriteProducts, setFavouriteProducts] = useState<string[]>(products?.filter(product => isProductFavourite(product._id)).map(product => product._id) || []);

  useEffect(() => {
    if (products) {
      const favProducts = products.filter(product => isProductFavourite(product._id)).map(product => product._id);
      setFavouriteProducts(favProducts);
    }
  }, [products, isProductFavourite]);

  const handleFavoriteToggle = useCallback(async (productId: string) => {
    if (favouriteProducts.includes(productId)) {
        await removeFavourite(productId);
        setFavouriteProducts(favouriteProducts.filter(id => id !== productId));
    } else {
        await addToFavourite(productId);
        setFavouriteProducts([...favouriteProducts, productId]);
    }
}, [favouriteProducts, addToFavourite, removeFavourite]);

  if (loading) {
    return(
      <div className="home">
        <Spinner />
      </div>
    );
  }

  return (

    <div className="home">
      <div className="product-slider-container">
        <h1>Today's offers</h1>
        <ProductSlider products={products as productData[]} favouriteProducts={favouriteProducts} onFavouriteToggle={handleFavoriteToggle}/>
      </div>
      <div className="all-products-container">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} loading={loading} isFavourite={favouriteProducts.includes(product._id)} onFavouriteToggle={handleFavoriteToggle} />
        ))}
      </div>
    </div>
  );
};

export default Home;
