import React, { useState } from "react";
import "./home.css";
import Dropdown from "../../components/dropdown/dropdown";
import useProduct from "../../hooks/useProduct";
import ProductCard from "../../components/product-card/product-card";

const Home = () => {
  const {products, loading} = useProduct();
  console.log(products);
  return (
    <div className="home">
                    {products?.map((product) => (
                        <ProductCard key={product._id} favourite={{productId: product}} loading={loading}/>
                    ))}
    </div>
  );
};

export default Home;
