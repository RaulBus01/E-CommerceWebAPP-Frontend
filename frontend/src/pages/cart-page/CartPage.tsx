import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Favorite, DeleteOutline } from "@mui/icons-material";
import useCart from "../../hooks/useCart";
import useFavourites from "../../hooks/useFavourites";
import "./CartPage.css";

const CartPage = () => {
  const { token, userId } = useAuth();
  const { cart, editProductQuantity, removeProduct } = useCart(userId, token);

  const handleEditProductQuantity = async (productId, quantity) => {
    await editProductQuantity(userId, productId, token, quantity);
  };

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Cart Page</h1>
      <div className="cart-items">
        {cart.map((product, index) => {
          return product ? (
            <div className="cart-item" key={product._id}>
              <img
                src={product.productId.imageUrl}
                alt={product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h2 className="cart-item-title">{product.productId.name}</h2>
                <div className="cart-item-description">
                  {product.productId.description}
                </div>
                <div className="cart-item-seller">
                  Seller: {product.productId.distributorId}
                </div>
                <div className="cart-item-availability">
                  Availability: {product.productId.stock}
                </div>
              </div>
              <div className="cart-item-right">
                <div className="cart-item-price">
                  <div>{product.productId.price} Lei</div>
                </div>
                <div className="cart-item-quantity">
                  <button
                    className="remove-quantity-button"
                    onClick={() =>
                      handleEditProductQuantity(
                        product.productId,
                        product.quantity - 1
                      )
                    }
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className="add-quantity-button"
                    onClick={() =>
                      handleEditProductQuantity(
                        product.productId,
                        product.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-actions">
                  <div
                    className="cart-item-action-favourites"
                    onClick={() => moveToFavourites(product.productId, userId)}
                  >
                    <Favorite style={{ marginRight: "8px", color: "red" }} />
                    Move to Favourites
                  </div>
                  <div
                    className="cart-item-action-remove"
                    onClick={() => removeProduct(userId, product.productId, token)}
                  >
                    <DeleteOutline style={{ marginRight: "8px" }} />
                    Remove
                  </div>
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default CartPage;
