import React, { useState } from "react";
import "./home.css";
import useProduct from '../../hooks/useProduct';
import ProductCard from '../../components/product-card/product-card';

const Home = () => {

  const { products, loading } = useProduct();


  return (
    <div className="home">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={product} loading={loading} />
                    ))}
    </div>
  );
};

export default Home;
