import React from "react";
import './favorite-page.css';
import ProductCard from "../../components/product-card/product-card";
import useFavourite from "../../hooks/useFavourite";
import { useAuth } from "../../hooks/useAuth";

const FavoritePage = () => {
  const { userId, token } = useAuth();
  const { favourites, loading } = useFavourite(userId, token);

  console.log('Rendering FavoritePage with favourites:', favourites);

  return (
    <div className="main-container">
      <h1>Your favourite items</h1>
      <div className="items-container">
        {loading && <p>Loading...</p>}
        {!loading && favourites && favourites.length > 0 ? (
          favourites.map((favourite) => (
            <ProductCard key={favourite.product._id} product={favourite.product} loading={loading} />
          ))
        ) : (
          <p>No favourite products</p>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
