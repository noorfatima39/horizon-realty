import React from 'react';

const ARTICLES = [
  { 
    id: 1, 
    tag: "MARKET TRENDS", 
    title: "Navigating Interest Shifts in Suburban Real Estate Development", 
    date: "June 14, 2026", 
    // Live Modern Real Estate/Office Building Image
    image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&auto=format&fit=crop&q=80" 
  },
  { 
    id: 2, 
    tag: "HOME DESIGN", 
    title: "Maximizing Natural Illumination via Modern Minimalist Frameworks", 
    date: "May 28, 2026", 
    // Live Minimalist Interior/Home Design Image
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop&q=80" 
  }
];

export default function Blog() {
  return (
    <div className="page-padding">
      <div className="centered-header">
        <h2>Horizon Market Insights</h2>
        <p>Expert analysis, design inspiration, and intelligence updates for the discerning homebuyer.</p>
      </div>
      <div className="grid-2-col max-width-900">
        {ARTICLES.map(post => (
          <article key={post.id} className="blog-item-card">
            <div className="blog-img-wrapper">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-info">
              <span className="blog-tag">{post.tag}</span>
              <h4>{post.title}</h4>
              <p className="blog-date">{post.date}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}