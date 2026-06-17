import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  // Mobile menu ko open/close karne ke liye state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* 1. LOGO */}
      <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
        <span className="logo-icon">▲</span> HORIZON <span className="logo-sub">REALTY</span>
      </Link>

      {/* 2. HAMBURGER ICON (Mobile par teen lines show karega) */}
      <button 
        className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* 3. NAVIGATION LINKS DROPDOWN */}
      <div className={`navbar-links ${isMenuOpen ? 'show-mobile-menu' : ''}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setIsMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setIsMenuOpen(false)}>
          Buy/Rent
        </NavLink>
        <NavLink to="/sell" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setIsMenuOpen(false)}>
          Sell
        </NavLink>
        <NavLink to="/agents" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setIsMenuOpen(false)}>
          Our Team
        </NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setIsMenuOpen(false)}>
          Market Insights
        </NavLink>
      </div>

      {/* 4. SCHEDULE TOUR BUTTON */}
      <Link to="/search" className="navbar-cta-btn" onClick={() => setIsMenuOpen(false)}>
        Schedule Tour
      </Link>
    </nav>
  );
}