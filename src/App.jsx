import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/SearchPage';
import PropertyDetail from './pages/PropertyDetail';
import AgentDirectory from './pages/AgentDirectory';
import SellWithUs from './pages/SellWithUs';
import Blog from './pages/Blog';
import './App.css';

function ScrollHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const INITIAL_PROPERTIES = [
  { 
    id: 1, 
    title: "Modern Villa", 
    price: 1250000, 
    location: "Beverly Hills, CA", 
    beds: 4, baths: 5, sqft: 4200, type: "house", 
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600", 
    description: "A stunning architectural marvel." 
  },
  { 
    id: 2, 
    title: "Urban Apartment", 
    price: 850000, 
    location: "Manhattan, NY", 
    beds: 2, baths: 2, sqft: 1250, type: "apartment", 
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600", 
    description: "Exquisite high-rise living." 
  },
  { 
    id: 3, 
    title: "Luxury Penthouse", 
    price: 3100000, 
    location: "Miami, FL", 
    beds: 3, baths: 4, sqft: 3100, type: "condo", 
    // Image updated to be unique
    image: "https://images.unsplash.com/photo-1599809275671-b3334f5979c5?q=80&w=600", 
    description: "Breathtaking direct oceanfront penthouse." 
  },
  { 
    id: 4, 
    title: "Family Home", 
    price: 485000, 
    location: "Austin, TX", 
    beds: 3, baths: 2.5, sqft: 2200, type: "house", 
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=600", 
    description: "Charming multi-level suburban family residence." 
  }
];

function App() {
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);

  useEffect(() => {
    const fetchDatabaseProperties = async () => {
      try {
        // Backend URL updated to Railway production
        const response = await fetch('https://horizon-realty-backend-production.up.railway.app/api/properties');
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data) && result.data.length > 0) {
          const dbListings = result.data.map(item => ({
            id: item._id,
            title: item.title,
            price: Number(item.price) || 0,
            location: item.location,
            type: item.propertyType ? item.propertyType.toLowerCase() : "house",
            beds: 3, baths: 2, sqft: 1800,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600",
            description: "User submitted listing."
          }));
          setProperties([...dbListings, ...INITIAL_PROPERTIES]);
        } else {
          setProperties(INITIAL_PROPERTIES);
        }
      } catch (error) {
        console.error("Backend unreachable:", error);
        setProperties(INITIAL_PROPERTIES);
      }
    };
    fetchDatabaseProperties();
  }, []);

  const addNewProperty = (newProperty) => {
    setProperties([newProperty, ...properties]);
  };

  return (
    <Router>
      <ScrollHandler />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage properties={properties} />} />
            <Route path="/homepage" element={<LandingPage properties={properties} />} />
            <Route path="/search" element={<SearchPage properties={properties} />} />
            <Route path="/property/:id" element={<PropertyDetail properties={properties} />} />
            <Route path="/agents" element={<AgentDirectory />} />
            <Route path="/sell" element={<SellWithUs onAddProperty={addNewProperty} />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;