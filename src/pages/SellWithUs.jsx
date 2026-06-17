import React, { useState } from 'react';
import { supabase } from '../supabaseClient';// Path bilkul sahi hai tumhara!

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
    
    // 1. Pehle Supabase ke liye naya object format ready karte hain jo table columns se match kare
    const dbListing = {
      Title: title,          // Supabase ka Capital 'Title' column name
      Price: Number(price),  // Capital 'Price' column name number format mein
      Location: location,    // Capital 'Location' column name
      Purpose: 'Sale'        // Hamara banaaya hua 'Purpose' column name
    };

    // 2. SUPABASE BACKEND DIRECT SYNC TRY BLOCK
    try {
      const { data, error } = await supabase
        .from('properties')   // Tumhare Supabase table ka naam
        .insert([dbListing])
        .select();

      if (error) {
        console.error('Supabase Error Details:', error);
        alert('Supabase Error: ' + error.message);
        return; // Agar database mein save na ho toh yahin ruk jaye
      }

      console.log('Synchronized to Supabase Database successfully!', data);

      // 3. Agar database mein save ho jaye, toh wahi data frontend state ko pass karenge
      if (data && data.length > 0) {
        // Aapka original local representation object setup matching matching keys
        const newListing = {
          id: data[0].id, // Supabase ki real auto-generated ID uthayega
          title: data[0].Title,
          location: data[0].Location,
          price: data[0].Price,
          type: type,
          beds: 3, baths: 2, sqft: 1800,
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
          description: "User submitted listing entry pending administrative approval tier."
        };

        // Frontend state update jo cards dikhati hai
        onAddProperty(newListing);
        alert('Listing successfully launched live into Supabase PostgreSQL Database!');
      }

    } catch (err) {
      console.error('Database connection failed:', err);
      alert('Connection failed: Check if .env fields are correct.');
    }

    // Inputs Reset trigger
    setTitle(''); 
    setLocation(''); 
    setPrice('');
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
          <input type="text" placeholder="Location (City, State)" value={location} onChange={(e) => setLocation(e.target.value)}  required />
          <input type="number" placeholder="Target Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} min="0" required />
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