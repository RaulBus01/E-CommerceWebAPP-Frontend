import React from "react";
import "./home.css";
import useProduct from '../../hooks/useProduct';
import ProductCard from '../../components/product-card/product-card';
import ProductSlider from "../../components/product-slider/product-slider";
import { productData } from "../../types/ProductType";
import Spinner from "../../components/spinner/spinner";


const Home = () => {
  const { products, loading } = useProduct();


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
        <ProductSlider products={products as productData[]}/>
      </div>
      <div className="all-products-container">
        {products?.map((product) => (
          <ProductCard 
         
          key={product._id} product={product} loading={loading} 
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
