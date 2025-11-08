import React from "react";
import { toast } from "react-toastify";
import "./Wishlist.css";

function Wishlist({ wishlist, setWishlist, setCart, cart }) {
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from wishlist", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      setCart([...cart, product]);
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      toast.success(`${product.name} added to cart`, {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      toast.info(`${product.name} is already in cart`, {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="wishlist-row">
          {wishlist.map((item) => (
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
                <button
                  className="remove-btn"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  Remove
                </button>
                <button
                  className="add-cart-btn"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-msg">Your wishlist is empty.</p>
      )}
    </div>
  );
}

export default Wishlist;
