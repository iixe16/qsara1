import React, { useState } from "react";
import "./Header.css";
import logoImage from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { FaUserCircle, FaBars } from 'react-icons/fa';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
    console.log("menuOpen:", !menuOpen);
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logoImage} alt="Logo" className="header__logo-image" />
      </div>

      <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
        <ul className="header__menu">
          <li><Link to="/Home">Home</Link></li>
          <li><Link to="/ChatBot">Ai ChatBot</Link></li>
          <li><Link to="/Flashcard">Flashcard</Link></li>
          <li><Link to="/Qoom">Study with friend</Link></li>
        </ul>
      </nav>

      <div className="header__profile">
        <Link to="/Profile">
          <FaUserCircle className="header__profile-icon" />
        </Link>
      </div>

      <div className="header__menu-toggle" onClick={toggleMenu}>
        <FaBars className="header__menu-icon" />
      </div>
    </header>
  );
}

export default Header;
