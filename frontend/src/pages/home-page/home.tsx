import React from "react";
import "./home.css";
import useProduct from '../../hooks/useProduct';
import ProductCard from '../../components/product-card/product-card';
import ProductSlider from "../../components/product-slider/product-slider";

const Home = () => {

  const { products, loading } = useProduct();


  return (
    <div className="home">
      <div className="product-slider-container">
        <h1>Today's offers</h1>
        <ProductSlider products={products}/>
      </div>
      <div className="all-products-container">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} loading={loading} />
        ))}
      </div>
    </div>
  );
};

export default Home;
