import "./App.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductList from "./components/ProductList";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route
          path="/:category"
          element={
            <ProductList
              addToWishlist={addToWishlist}
              setCart={setCart}
              cart={cart}
            />
          }
        />
        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              setWishlist={setWishlist}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
