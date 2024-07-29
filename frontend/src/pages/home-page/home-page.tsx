import React, { useState } from "react";
import "./home.css";
import Dropdown from "../../components/dropdown/dropdown";
import useProduct from "../../hooks/useProduct";
import ProductCard from "../../components/product-card/product-card";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { userId, token } = useAuth();
  const {products, loading} = useProduct(userId, token);
  return (
    <div className="home">
                    {products?.map((product) => (
                        <ProductCard key={product._id} product={ product } loading={loading}/>
                    ))}
    </div>
  );
};

export default Home;
