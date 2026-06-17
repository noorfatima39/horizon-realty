import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  // Mobile menu ko open/close karne ke liye state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo" onClick={() => setIsMenuOpen(false)}>
        <span className="logo-icon">▲</span> HORIZON <span className="logo-sub">REALTY</span>
      </Link>

      {/* Hamburger Icon - Jo mobile screen par 3 lines show karega */}
      <button 
        className={`hamburger ${isMenuOpen ? 'open' : ''}`} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Links Layout - Ismein state check ho rahi hai */}
      <div className={`navbar-links ${isMenuOpen ? 'show-mobile-menu' : ''}`}>
        <NavLink 
          to="/" 
          end 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          onClick={() => setIsMenuOpen(false)} // Link click hote hi menu close ho jaye
        >
          Home
        </NavLink>
        <NavLink 
          to="/search" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          onClick={() => setIsMenuOpen(false)}
        >
          Buy/Rent
        </NavLink>
        <NavLink 
          to="/sell" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          onClick={() => setIsMenuOpen(false)}
        >
          Sell
        </NavLink>
        <NavLink 
          to="/agents" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          onClick={() => setIsMenuOpen(false)}
        >
          Our Team
        </NavLink>
        <NavLink 
          to="/blog" 
          className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}
          onClick={() => setIsMenuOpen(false)}
        >
          Market Insights
        </NavLink>
      </div>

      <Link to="/search" className="navbar-cta-btn" onClick={() => setIsMenuOpen(false)}>
        Schedule Tour
      </Link>
    </nav>
  );
}