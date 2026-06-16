import React from 'react';
import { Link } from 'react-router-dom';

export default function PropertyCard({ property }) {
  return (
    <div className="property-card">
      <div className="img-container">
        <img src={property.image} alt={property.title} />
        <span className="tag-badge">For Sale</span>
      </div>
      <div className="card-info">
        <h3>{property.title}</h3>
        <p className="loc">📍 {property.location}</p>
        <p className="price">${property.price.toLocaleString()}</p>
        <div className="specs">
          <span>🛏️ {property.beds} beds</span> • <span>🛁 {property.baths} baths</span> • <span>📐 {property.sqft} sqft</span>
        </div>
        <Link to={`/property/${property.id}`} className="view-link">View Detailed Specs →</Link>
      </div>
    </div>
  );
}