import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Wishlist.css";

function Cart({ cart = [], setCart }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelect = (id) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    toast.info("Item removed from cart", {
      position: "top-center",
      autoClose: 2000,
      closeButton: false,
    });
  };

  const total = cart
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

  return (
    <div className="wishlist-container">
      <h2>Your Shopping Cart</h2>
      {cart.length > 0 ? (
        <>
          <div className="wishlist-row">
            {cart.map((item) => (
              <div key={item.id} className="wishlist-card">
                <div className="wishlist-img-wrapper">
                  <img
                    src={item.image_link || "https://via.placeholder.com/150"}
                    alt={item.name}
                  />
                </div>
                <div className="wishlist-info">
                  <h4>{item.name}</h4>
                  <p>{item.brand || "Unknown Brand"}</p>
                  <span>${item.price}</span>
                </div>
                <div className="wishlist-actions">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelect(item.id)}
                    />
                    Buy this
                  </label>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn">Checkout Selected</button>
          </div>
        </>
      ) : (
        <p className="empty-msg">Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
