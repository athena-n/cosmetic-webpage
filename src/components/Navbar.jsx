import React, { useState } from "react";
import logo from "../logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingCart,
  faHeart,
  faFilter,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="menu-btn"
        >
          <FontAwesomeIcon icon={faBars} className="icon-btn" />
        </button>

        <div className={`dashboard-container ${showMenu ? "show" : ""}`}>
          <Link to="/eyes">Eyes</Link>
          <Link to="/lips">Lips</Link>
          <Link to="/face">Face</Link>
          <Link to="/hair">Hair</Link>
          <Link to="/nails">Nails</Link>
          <Link to="/fragrance">Fragrance</Link>
        </div>

        <Link to={"/"}>
          <img src={logo} alt="Papilora logo" className="logo" />
        </Link>
        <h4 className="brand-name">Papilora</h4>
      </div>

      <div className="nav-center">
        <Link to="/eyes">Eyes</Link>
        <Link to="/lips">Lips</Link>
        <Link to="/face">Face</Link>
        <Link to="/hair">Hair</Link>
        <Link to="/nails">Nails</Link>
        <Link to="/fragrance">Fragrance</Link>
      </div>

      <div className="nav-right">
        <FontAwesomeIcon icon={faSearch} className="icon-btn" />

        <FontAwesomeIcon icon={faFilter} className="icon-btn" />
        <Link to={"/wishlist"}>
          <FontAwesomeIcon icon={faHeart} className="icon-btn" />
        </Link>
        <Link to={"/cart"}>
          <FontAwesomeIcon icon={faShoppingCart} className="icon-btn" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
