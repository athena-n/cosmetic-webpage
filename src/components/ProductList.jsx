import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductList.css";
import Banner from "./Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function ProductList({ addToWishlist, setCart, cart }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) {
      setCart([...cart, product]);
      toast.success(`${product.name} added to cart `, {
        position: "top-center",
        autoClose: 2000,
        closeButton: false,
      });
    } else {
      toast.info(`${product.name} is already in cart`, {
        position: "top-center",
        closeButton: false,
        autoClose: 2000,
      });
    }
  };

  const categoryMap = useMemo(() => {
    return {
      lips: ["lipstick", "lip_liner"],
      eyes: ["eyeliner", "mascara", "eyeshadow"],
      face: ["bronzer", "blush", "foundation"],
      nails: ["nail_polish"],
      fragrance: [],
      hair: [],
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryMap[category]) return;
      setProducts([]);

      for (const type of categoryMap[category]) {
        const res = await fetch(
          `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`
        );
        const data = await res.json();
        setProducts((prev) => [...prev, ...data]);
      }
    };
    fetchProducts();
  }, [category, categoryMap]);

  const [sortOption, setSortOption] = useState("");
  const handleSort = (option) => {
    setSortOption(option);

    const sortMethods = {
      "name-asc": (a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1,
      "name-desc": (a, b) =>
        a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1,
      "price-low": (a, b) => parseFloat(a.price) - parseFloat(b.price),
      "price-high": (a, b) => parseFloat(b.price) - parseFloat(a.price),
      newest: (a, b) => new Date(b.created_at) - new Date(a.created_at),
      oldest: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    };

    if (sortMethods[option]) {
      setProducts((prev) => [...prev].sort(sortMethods[option]));
    }
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist `, {
      position: "top-center",
      closeButton: false,
      autoClose: 2000,
    });
  };

  return (
    <>
      <Banner />
      <div className="product-list">
        <div className="sort">
          <select
            className="sort-select"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="name-asc">Alphabet: A → Z</option>
            <option value="name-desc">Alphabet: Z → A</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="newest">Created: Newest → Oldest</option>
            <option value="oldest">Created: Oldest → Newest</option>
          </select>
        </div>

        <div className="product-grid">
          {products.length > 0 &&
            products.slice(0, 30).map((p) => (
              <div key={p.id} className="product-card">
                <div className="icon-container">
                  <FontAwesomeIcon icon={faShare} className="icon-btn" />
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="icon-btn"
                    onClick={() => handleAddToWishlist(p)}
                  />
                </div>
                <img src={p.image_link} alt={p.name} />
                <h4>{p.name}</h4>
                <p className="brand">{p.brand}</p>
                <span>${p.price}</span>
                <button onClick={() => addToCart(p)}>Add to Cart</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductList;
