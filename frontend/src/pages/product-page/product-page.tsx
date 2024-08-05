import React, { useCallback, useEffect, useState } from "react";
import "./product-page.css";
import { useParams } from "react-router";
import useProduct from "../../hooks/useProduct";
import { useAuth } from "../../hooks/useAuth";
import useFavourite from "../../hooks/useFavourite";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { product, loading } = useProduct(undefined, undefined, productId);
  const { userId, token } = useAuth();
  const { addToFavourite, removeFavourite, isProductFavourite } = useFavourite(userId, token);

  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    if (product && productId) {
      const isFav = isProductFavourite(productId);
      setIsFavourite(isFav);
      console.log("Product ID:", productId);
      console.log("Fetched Product:", product);
      console.log("Is Favorite:", isFav);
    }
  }, [productId, product, isProductFavourite]);

  const handleFavorite = useCallback(async () => {
    if (!userId) {
      alert("You must be logged in to add favorites!");
      return;
    }
    try {
      if (isFavourite) {
        await removeFavourite(product._id);
        setIsFavourite(false);
      } else {
        await addToFavourite(product._id);
        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Failed to update favorite status", error);
    }
  }, [isFavourite, product, addToFavourite, removeFavourite, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-main-container">
      <div className="product-data-container">
        <div className="horizontal-data">
          <div className="image-container">
            <img src={product.image || "https://placehold.jp/150x150.png"} alt="selected-product-image" />
            <div className="secondary-images"></div>
          </div>
          <div className="buy-data">
            <h1>{product.price} lei</h1>
            <div className="product-button-container">
              <button>
                <AddShoppingCartIcon></AddShoppingCartIcon>
              </button>
              <button onClick={handleFavorite}>
                <FavoriteIcon style={{ color: isFavourite ? "red" : "white" }}></FavoriteIcon>
              </button>
            </div>
          </div>
        </div>
        <div className="product-info-container">
          <h2>{product.name}</h2>
          <h3>{product.description}</h3>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductPage);
