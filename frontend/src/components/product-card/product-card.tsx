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
import { useNavigate } from "react-router-dom";


interface ProductCardProps {
  product: productData;
  loading: boolean;
  onRemoveFavorite?: (productId: string) => void;
  setProducts?: (products: productData[]) => void;
  products?: productData[] | null;
  deleteProduct?: (productId: string) => Promise<boolean>;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, loading,onRemoveFavorite,setProducts,products,deleteProduct }) => {
 
  const { token, user } = useAuth();
  const navigate = useNavigate();

  const isCustomer = user?.role === "customer";
  const { addToFavourite, removeFavourite, isProductFavourite } = isCustomer ? useFavourite(token as string) : { addToFavourite: () => {}, removeFavourite: () => {}, isProductFavourite: () => false };
  const { addProductToCart } = isCustomer ? useCart(token as string) : { addProductToCart: () => {} };
  
  const isFavorite = user?.role === "customer" ? isProductFavourite(product._id) : false;
  const isDistributorAssigned = user?.role === "distributor" && product.distributor._id === user.id;

  const handleFavorite = useCallback(async () => {
    if (isFavorite) {
      await removeFavourite(product._id);
      if (onRemoveFavorite) {
        onRemoveFavorite(product._id);
      }
    } else {
      await addToFavourite(product._id);
    }
  }, [isFavorite, product._id, addToFavourite, removeFavourite, onRemoveFavorite]);

  const handleAddToCart = useCallback(async () => {
    await addProductToCart(product, token);
  }, [addProductToCart, product, token]);

 
  const handleDeleteProduct = async () => {
    const response = window.confirm("Are you sure you want to delete this product?");
    if (response === true) {
      try {
          if (!deleteProduct) {
            return;
          }
          await deleteProduct(product._id);
        
        const updatedProduct = { ...product, isActive: false };
        console.log(product); 
        console.log(updatedProduct);

        const updatedProducts = products?.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
        
        if (setProducts) {
          setProducts(updatedProducts || []);
        }

       



       
      } catch (error) {
        console.error("Failed to delete product:", error);
      }

   
  }
}
  const handleProductPage = () => {
    console.log(product._id);
    navigate(`/product/${product._id}`);
  };

  if (loading) {
    return <div>Loading</div>;
  }

 

  return (
    <div className="card-container">
      <img  src={product.image[0]} alt="product" onClick={handleProductPage} />
      <div className="information-container">
        
        {<p onClick={handleProductPage} className="product-name">{product.name}</p>}
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
          : isDistributorAssigned &&
          <>
          <button className="edit-button" onClick={() => navigate(`/edit-product/${product._id}`)}>
            <EditIcon /> Edit
          </button>

           {product.isActive && <button className="delete-button" onClick={handleDeleteProduct}>
            <DeleteIcon /> Delete
          </button> 
            } 
            
          </> 
        }
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
