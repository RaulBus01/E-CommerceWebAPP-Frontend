import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Favorite, DeleteOutline } from "@mui/icons-material";
import useCart from "../../hooks/useCart";
import useFavourite from "../../hooks/useFavourite";
import "./CartPage.css";

const CartPage = () => {
  const { token, userId } = useAuth();
  const { cart, setCart, editProductQuantity, removeProduct } = useCart(userId, token);
  const { favourites, setFavourites, addToFavourite, removeFavourite } = useFavourite(userId, token);

  const handleEditProductQuantity = async (product, type) => {
    let quantity = product.quantity;
    let stock = product.product.stock;
    if (type === "increase") {
      quantity++;
      stock--;
    } else if (type === "decrease") {
      quantity--;
      stock++;
    }
    await editProductQuantity(userId, product, token, type);
    const newCart = cart.map((cartItem) =>
      cartItem.product._id === product.product._id
        ? { ...cartItem, quantity, product: { ...cartItem.product, stock } }
        : cartItem
    );
    setCart(newCart);
  };

  const handleFavourites = async (product) => {
    if (addToFavourite) {
      await addToFavourite(product._id);
      removeProduct(userId, product, token);
    } else {
      await removeFavourite(product._id);
    }
  };

  const handleRemove = async (product) => {
    await removeProduct(userId, product, token);
    const newCart = cart.products.filter((cartItem) => cartItem.product._id !== product._id);
    setCart(newCart);
  };

  if (!cart?.products?.length) {
    return <div className="cart-page">Your cart is empty.</div>;
  }

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Cart Page</h1>
      <div className="cart-items">
        {cart.products.map((product, index) => (
          <div className="cart-item" key={product.product._id}>
            {/* <img
              src={product.product.imageUrl}
              alt={product.product.name}
              className="cart-item-image"
            /> */}
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
                  onClick={() => handleEditProductQuantity(product, "decrease")}
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  className="add-quantity-button"
                  onClick={() => handleEditProductQuantity(product, "increase")}
                >
                  +
                </button>
              </div>
              <div className="cart-item-actions">
                <div
                  className="cart-item-action-favourites"
                  onClick={() => handleFavourites(product.product)}
                >
                  <Favorite style={{ marginRight: "8px", color: "red" }} />
                  Move to Favourites
                </div>
                <div
                  className="cart-item-action-remove"
                  onClick={() => handleRemove(product.product)}
                >
                  <DeleteOutline style={{ marginRight: "8px" }} />
                  Remove
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPage;
