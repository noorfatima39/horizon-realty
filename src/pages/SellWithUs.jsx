import React, { useState } from 'react';

export default function SellWithUs({ onAddProperty }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('house');
  const [calcAddress, setCalcAddress] = useState('');
  const [estimatedValue, setEstimatedValue] = useState(null);

  const handleCalculate = (e) => {
    e.preventDefault();
    const baseValue = calcAddress.length * 12000 + 400000;
    setEstimatedValue(baseValue);
  };

  const handleListingSubmit = async (e) => {
    e.preventDefault();
    
    // Aapka original local object arrangement
    const newListing = {
      id: Date.now(),
      title,
      location,
      price: Number(price),
      type,
      beds: 3, baths: 2, sqft: 1800,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
      description: "User submitted listing entry pending administrative approval tier."
    };

    // --- DB WALI CHEEZ ADDED HERE ---
    try {
      // Backend ko parallel data send karne ke liye setup
      await fetch('https://horizon-realty-backend-production.up.railway.app/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          location,
          price: Number(price),
          propertyType: type // Backend parameter map structure sync
        })
      });
      console.log('Synchronized to Cloud Database successfully!');
    } catch (error) {
      console.error('Database sync failed, but frontend will update locally:', error);
    }
    // --------------------------------

    // Aapka original state push aur workflow setup line-by-line unchanged
    onAddProperty(newListing);
    alert('Listing successfully launched live into client state array!');
    setTitle(''); setLocation(''); setPrice('');
  };

  return (
    <div className="split-panel-container">
      <div className="panel-box light-cream-bg">
        <h3>Instant AI Valuation</h3>
        <form onSubmit={handleCalculate}>
          <label>Property Address</label>
          <input type="text" placeholder="123 Luxury Lane, City..." value={calcAddress} onChange={(e) => setCalcAddress(e.target.value)} required />
          <button type="submit" className="valuation-btn">Evaluate Value</button>
        </form>
        {estimatedValue && (
          <div className="valuation-display">
            <h5>Estimated Baseline Assessment</h5>
            <p className="val-figure">${estimatedValue.toLocaleString()}</p>
          </div>
        )}
      </div>

      <div className="panel-box dark-green-bg text-white">
        <h3>List Your Property Globally</h3>
        <form onSubmit={handleListingSubmit} className="dark-form">
          <input type="text" placeholder="Listing Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <input type="text" placeholder="Location (City, State)" value={location} onChange={(e) => setLocation(e.target.value)} required />
          <input type="number" placeholder="Target Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
          </select>
          <button type="submit" className="gold-submit-btn">Publish Listing</button>
        </form>
      </div>
    </div>
  );
}