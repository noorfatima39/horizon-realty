import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';

export default function SearchPage({ properties }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState(4000000);

  const filteredData = properties.filter(item => {
    const matchesSearch = item.location.toLowerCase().includes(search.toLowerCase()) || item.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesPrice = item.price <= maxPrice;
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="search-page-layout">
      <aside className="filter-sidebar">
        <h3>Filter Properties</h3>
        <div className="input-group">
          <label>Location / Keyword</label>
          <input type="text" placeholder="e.g. Austin, Villa..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Property Class</label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Structures</option>
            <option value="house">Houses</option>
            <option value="apartment">Apartments</option>
            <option value="condo">Condos</option>
          </select>
        </div>

        <div className="input-group">
          <label>Maximum Price: ${maxPrice.toLocaleString()}</label>
          <input type="range" min="400000" max="4000000" step="50000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
        </div>
      </aside>

      <section className="listings-results-panel">
        <h2>Available Listings ({filteredData.length})</h2>
        {filteredData.length === 0 ? (
          <div className="empty-state">No listings match your selected filters.</div>
        ) : (
          <div className="grid-2-col">
            {filteredData.map(item => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}