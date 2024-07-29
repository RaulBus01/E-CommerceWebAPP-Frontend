import React, { useCallback, useEffect, useState } from "react";
import "./product-card.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAuth } from "../../hooks/useAuth";
import useFavourite from "../../hooks/useFavourite";
import { productData } from "../../types/ProductType";

interface ProductCardProps {
  product: productData;
  loading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading }) => {
  const { userId, token } = useAuth();
  const { addToFavourite, removeFavourite, isProductFavourite } = useFavourite(userId, token);

  const isFavorite = isProductFavourite(product._id);

  const handleFavorite = useCallback(async () => {
    if (isFavorite) {
      await removeFavourite(product._id);
    } else {
      await addToFavourite(product._id);
    }
  }, [isFavorite, product._id, addToFavourite, removeFavourite]);

  return (
    <div className="card-container">
      <img src={product.image} alt="product" />
      <div className="information-container">
        <p className="product-name">{product.name}</p>
        <h2>{product.price} lei</h2>
      </div>
      <div className="rating-container">
        <StarIcon style={{ color: "yellow" }} />
        <p>
          {product.ratingProduct || "N/A"} ({product.numberOfReviews || 0})
        </p>
      </div>
      <div className="button-container">
        <button>
          <AddShoppingCartIcon />
        </button>
        <button onClick={handleFavorite} className="favorite-button">
          <FavoriteIcon style={{ color: isFavorite ? "red" : "white" }} />
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
