import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">▲</span> HORIZON <span className="logo-sub">REALTY</span>
      </Link>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Home</NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Buy/Rent</NavLink>
        <NavLink to="/sell" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Sell</NavLink>
        <NavLink to="/agents" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Our Team</NavLink>
        <NavLink to="/blog" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>Market Insights</NavLink>
      </div>
      <Link to="/search" className="navbar-cta-btn">Schedule Tour</Link>
    </nav>
  );
}