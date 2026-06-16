import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

export default function LandingPage({ properties }) {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      <section className="hero">
        <div className="hero-text">
          <span className="sub-title">FIND YOUR PERFECT SPACE</span>
          <h1>Find a Better Place to <span className="highlight">Live.</span></h1>
          <p>Premium properties. Prime locations. Trusted by thousands of homeowners.</p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate('/search')}>Explore Properties</button>
            <button className="secondary-btn" onClick={() => navigate('/agents')}>Book Consultation</button>
          </div>
        </div>
        <div className="hero-img-box">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800" alt="Luxury House Dashboard" />
        </div>
      </section>

      <section className="simple-stress-free">
        <h2>We Make Real Estate Simple & Stress-Free.</h2>
        <div className="services-mini-grid">
          <div className="s-box"><h4>Buy a Home</h4><p>Find your sweet spot with matching personalized alerts.</p></div>
          <div className="s-box"><h4>Sell a Property</h4><p>Get top-tier valuation tracking and target marketing options.</p></div>
          <div className="s-box"><h4>Rent a Place</h4><p>Discover local flexible leasing listings updated daily.</p></div>
        </div>
      </section>

      <section className="featured-listings" style={{ padding: '40px 6%' }}>
        <div className="row-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Featured Architecture</h2>
          <button className="secondary-btn" onClick={() => navigate('/search')}>View All Properties →</button>
        </div>
        <div className="grid-3-col">
          {properties.slice(0, 3).map(item => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </div>
      </section>
    </div>
  );
}