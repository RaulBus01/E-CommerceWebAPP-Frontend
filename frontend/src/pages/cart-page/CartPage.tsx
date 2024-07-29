import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Favorite, DeleteOutline } from "@mui/icons-material";
import useCart from "../../hooks/useCart";

import "./CartPage.css";

const CartPage = () => {
  const { token, userId } = useAuth();
  const { cart, editProductQuantity, removeProduct } = useCart(userId, token);

  const handleEditProductQuantity = async (product, quantity) => {
    await editProductQuantity(userId, product, token, quantity);
  };

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Cart Page</h1>
      <div className="cart-items">
        {cart.map((product, index) => {
          return product ? (
            <div className="cart-item" key={product._id}>
              <img
                src={product.product.imageUrl}
                alt={product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h2 className="cart-item-title">{product.product.name}</h2>
                <div className="cart-item-description">
                  {product.product.description}
                </div>
                <div className="cart-item-seller">
                  Seller: {product.product.distributorId}
                </div>
                <div className="cart-item-availability">
                  Availability: {product.product.stock}
                </div>
              </div>
              <div className="cart-item-right">
                <div className="cart-item-price">
                  <div>{product.product.price} Lei</div>
                </div>
                <div className="cart-item-quantity">
                  <button
                    className="remove-quantity-button"
                    onClick={() =>
                      handleEditProductQuantity(
                        product.product,
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
                        product.product,
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
                    onClick={() => moveToFavourites(product.product, userId)}
                  >
                    <Favorite style={{ marginRight: "8px", color: "red" }} />
                    Move to Favourites
                  </div>
                  <div
                    className="cart-item-action-remove"
                    onClick={() => removeProduct(userId, product.product, token)}
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
