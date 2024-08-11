import React, { useCallback, useEffect, useRef, useState } from "react";
import "./product-page.css";
import { useParams } from "react-router";
import useProduct from "../../hooks/useProduct";
import { useAuth } from "../../hooks/useAuth";
import useFavourite from "../../hooks/useFavourite";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import ReviewsSubmenu from "../../components/product-page-submenus/reviews-submenu/reviews-submenu.tsx";
import QuestionsSubmenu from "../../components/product-page-submenus/questions-submenu/questions-submenu.tsx";

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { loading, product, fetchProductById } = useProduct();
  const { user, token } = useAuth();
  const { addToFavourite, removeFavourite, isProductFavourite } = useFavourite(token);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<string>("Reviews");

  const reviewRef = useRef<HTMLDivElement>(null);
  
  const loadSelectedMenu = () => {
    switch (selectedMenu){
      case "Reviews":
        return <ReviewsSubmenu user={user} reviewRef={reviewRef} productId={productId} token={token} />;
      case "Questions":
        return <QuestionsSubmenu productId={productId} user={user} token={token} />;
      default:
        return <ReviewsSubmenu user={user} reviewRef={reviewRef} productId={productId} token={token} />;
    }
  }
  useEffect(() => {
    if (productId) {
      fetchProductById(productId);
    }
  }, [productId, fetchProductById]);

  useEffect(() => {
    if (product && productId) {
      const isFav = isProductFavourite(productId);
      setIsFavourite(isFav);
    }
  }, [productId, product, isProductFavourite]);

  const handleFavorite = useCallback(async () => {
    try {
      if (isFavourite) {
        await removeFavourite(productId);
        setIsFavourite(false);
      } else {
        await addToFavourite(productId);
        setIsFavourite(true);
      }
    } catch (error) {
      console.error("Failed to update favorite status", error);
    }
  }, [isFavourite, product, addToFavourite, removeFavourite]);

  const scrollToReviews = () => {
    setSelectedMenu("Reviews");

    setTimeout(() => {
      if(reviewRef.current){
        reviewRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="product-main-container">
        <div className="product-data-container">
          <div className="horizontal-data">
            <div className="image-container">
              <img src={product?.images[0] || "https://placehold.jp/150x150.png"} alt="selected-product-image" />
              <div className="secondary-images"></div>
            </div>
            <div className="buy-data">
              <h1>{product.price} lei</h1>
              <div className="rating-product-display" onClick={scrollToReviews}>
                <h3>{product.ratingProduct}</h3>
                <StarIcon style={{ color: "yellow" }} />
                <p>({product.numberOfReviews})</p>
              </div>
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
        <div className="select-button-container">
          <button
            className={selectedMenu === "Reviews" ? "selected" : ""}
            onClick={() => setSelectedMenu("Reviews")}
          >
            Reviews
          </button>
          <button
            className={selectedMenu === "Questions" ? "selected" : ""}
            onClick={() => setSelectedMenu("Questions")}
          >
            Questions
          </button>
        </div>
        {loadSelectedMenu()}
      </div>
    </>
  );
};

export default React.memo(ProductPage);
