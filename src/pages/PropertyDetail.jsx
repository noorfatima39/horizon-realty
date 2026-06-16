import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function PropertyDetail({ properties }) {
  const { id } = useParams();
  const property = properties.find(item => item.id === parseInt(id));
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!property) {
    return <div className="page-padding"><h3>Listing not found.</h3><Link to="/search">Return to browse</Link></div>;
  }

  return (
    <div className="details-container">
      <div className="hero-media-header">
        <img src={property.image} alt={property.title} className="wide-detail-img" />
      </div>

      <div className="split-details-layout">
        <div className="details-main-info">
          <h1>{property.title}</h1>
          <p className="detail-loc">📍 {property.location}</p>
          <hr />
          <div className="pill-specs-row">
            <span>🛏️ {property.beds} Bedrooms</span>
            <span>🛁 {property.baths} Bathrooms</span>
            <span>📐 {property.sqft} Sq Ft</span>
          </div>
          <h3>Property Description</h3>
          <p className="long-desc">{property.description}</p>
        </div>

        <div className="details-sidebar-form">
          <div className="sticky-booking-card">
            <h4>Listed Pricing</h4>
            <p className="sidebar-price">${property.price.toLocaleString()}</p>
            
            {formSubmitted ? (
              <div className="success-banner">✓ Tour Scheduled! An agent will connect soon.</div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}>
                <label>Preferred Date</label>
                <input type="date" required />
                <label>Full Name</label>
                <input type="text" placeholder="Your Name" required />
                <button type="submit" className="submit-tour-btn">Schedule Private Tour</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}