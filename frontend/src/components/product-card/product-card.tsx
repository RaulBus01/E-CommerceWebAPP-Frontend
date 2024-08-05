import React, { useCallback, useEffect, useState } from "react";
import "./product-card.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useAuth } from "../../hooks/useAuth";
import useFavourite from "../../hooks/useFavourite";
import { productData } from "../../types/ProductType";
import  useCart  from "../../hooks/useCart";
import { useNavigate } from "react-router";


interface ProductCardProps {
  product: productData;
  loading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading }) => {
  const { token } = useAuth();
  const { addToFavourite, removeFavourite, isProductFavourite } = useFavourite();
  const { addProductToCart } = useCart(token as string);
 

  const isFavorite = isProductFavourite(product._id);
  const navigate = useNavigate();

  const handleFavorite = useCallback(async () => {
    if (isFavorite) {
      await removeFavourite(product._id);
    } else {
      await addToFavourite(product._id);
    }
    window.location.reload();
  }, [isFavorite, product._id, addToFavourite, removeFavourite]);

  const handleAddToCart = useCallback(async () => {
    await addProductToCart(product, token);
 
  }
  , [addProductToCart, product, token]);


 

  const handleProductPage = () =>{
    navigate(`/product/${product._id}`)
  }

  return (
    <div className="card-container">
      <img onClick={handleProductPage} src={product.image} alt="product" />
      <div className="information-container">
        <p onClick={handleProductPage} className="product-name">{product.name}</p>
        <h2>{product.price} lei</h2>
      </div>
      <div className="rating-container">
        <StarIcon style={{ color: "yellow" }} />
        <p>
          {product.ratingProduct || "N/A"} ({product.numberOfReviews || 0})
        </p>
      </div>
      <div className="button-container">
        <button  onClick={handleAddToCart} className="add-to-cart-button">
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
