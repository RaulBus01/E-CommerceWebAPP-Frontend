import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Favorite, DeleteOutline } from "@mui/icons-material";
import useCart from "../../hooks/useCart";
import useFavourite from "../../hooks/useFavourite";
import "./CartPage.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const CartPage = () => {
  const { token, user} = useAuth();
  const { cart, setCart, editProductQuantity, removeProduct } = useCart(token as string);
  const { addToFavourite, removeFavourite } = useFavourite(token as string);

  const navigate = useNavigate();

  const handleEditProductQuantity = async (product, type) => {
    let quantity = product.quantity;
    let stock = product.product.stock;
    if (type === "increase") {
      quantity++;
      stock--;
      await editProductQuantity(product,type);
    } else if (type === "decrease") {
      quantity--;
      stock++;
      if (quantity <= 0) {
        await removeProduct(product.product, token);
        const newCart = cart.products.filter((cartItem) => cartItem.product._id !== product.product._id);
        setCart({ ...cart, products: newCart });
        return;
      } else {
        await editProductQuantity(product,type);
      }
    }
    const newCart = cart.products.map((cartItem) =>
      cartItem.product._id === product.product._id
        ? { ...cartItem, quantity, product: { ...cartItem.product, stock } }
        : cartItem
    );
    setCart({ ...cart, products: newCart });
  };

  const handleFavourites = async (product) => {
    if (addToFavourite) {
      const result =  await addToFavourite(product._id);
      if(!result) 
      {
        toast.error("Product already in favourites");
        return;
      }

      await removeProduct(product, token);
    } else {
      await removeFavourite(product._id);
    }
  };

  const handleRemove = async (product) => {
    await removeProduct(product, token);
    const newCart = cart.products.filter((cartItem) => cartItem.product._id !== product._id);
    setCart({ ...cart, products: newCart });
  };

  const handleCheckout = () => {
    navigate('/checkoutData', { state: { cart, token, user} });
  }

  return (
    <div className="cart-page">
      <h1 className="cart-page-title">Cart Page</h1>
      <div className="cart-items">
        {cart.products && cart.products.length > 0 ? (
          cart.products.map((product, index) => (
            <div className="cart-item" key={product.product._id}>
              <div className="cart-item-details">
                <h2 className="cart-item-title">{product.product.name}</h2>
                <div className="cart-item-description">
                  {product.product.description}
                </div>
                <div className="cart-item-seller">
                  Seller: {product.product.distributor}
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
                    disabled={product.quantity <= 0}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className="add-quantity-button"
                    onClick={() => handleEditProductQuantity(product, "increase")}
                    disabled={product.product.stock <= 0}
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
          ))
        ) : (
          <p>No products in the cart</p>
        )}
      </div>
      {cart.products && cart.products.length > 0 && (
        <div className="checkout-button-container">
          {user?.customerInfo?.isVerified ? (
          <button onClick={(handleCheckout)}>Proceed to checkout</button>
          ) : (
            <div className="checkout-button-container">
              <p>Please verify your account to proceed to checkout</p> 
              <button onClick={() => navigate(`/user-dashboard/${user?._id}`)}>Go to account</button>
            </div>

            
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
