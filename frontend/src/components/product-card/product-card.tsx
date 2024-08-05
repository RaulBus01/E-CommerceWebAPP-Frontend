import React, { useCallback, useEffect, useState } from "react";
import "./product-card.css";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from "../../hooks/useAuth";
import useFavourite from "../../hooks/useFavourite";
import { productData } from "../../types/ProductType";
import  useCart  from "../../hooks/useCart";
import useProduct from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";


interface ProductCardProps {
  product: productData;
  loading: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading }) => {
  const { token,user } = useAuth();
  const navigate = useNavigate();

  const isCustomer = user?.role === "customer";
  const { addToFavourite, removeFavourite, isProductFavourite } = isCustomer ? useFavourite(token as string) : { addToFavourite: () => {}, removeFavourite: () => {}, isProductFavourite: () => false };
  const { addProductToCart } = isCustomer ? useCart(token as string) : { addProductToCart: () => {} };
  
 const isFavorite = user?.role === "customer" ? isProductFavourite(product._id) : false;

  const handleFavorite = useCallback(async () => {
    if (isFavorite) {
      await removeFavourite(product._id);
    } else {
      await addToFavourite(product._id);
    }
    window.location.reload();
  }, [isFavorite, product._id, addToFavourite, removeFavourite]);
  
 
  const handleNavigate = (path) => {
    navigate(path);
  }

  const handleAddToCart = useCallback(async () => {
    await addProductToCart(product, token);
 
  }
  , [addProductToCart, product, token]);
  const { products, setProducts,deleteProduct } = useProduct();
  const handleDeleteProduct = async () => {
    if (token && user?.role === "distributor") {
        const response = await deleteProduct(product._id);
        if (response) {
            setProducts(products.filter((p) => p._id !== product._id));
        }
      

    }
  }
 

  if (loading) {
    return <div>Loading
    </div>;
  }


  return (
    <div className="card-container">
      {/* <img onClick={handleProductPage} src={product.image} alt="product" /> */}
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
        {user?.role === "customer" ? 
         <>
          <button  onClick={handleAddToCart} className="add-to-cart-button">
            <AddShoppingCartIcon />
          </button>
          <button onClick={handleFavorite} className="favorite-button">
            <FavoriteIcon style={{ color: isFavorite ? "red" : "white" }} />
          </button>
          </>
          :
          <>
          <button className="edit-button">
            <EditIcon /> Edit
          </button>
          <button className="delete-button" onClick={handleDeleteProduct}>
            <DeleteIcon /> Delete
          </button>
            
          </> 
        }
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
