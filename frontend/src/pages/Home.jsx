import React from 'react';
import ProductList from '../components/ProductList';
import { ArrowRight, Zap, Shield, Headphones } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="hero-section animate-fade-in">
        <div className="hero-content">
          <div className="floating-container" style={{ marginBottom: '24px', width: '240px', margin: '0 auto 24px auto' }}>
            <img src="/swastiktech_logo.svg" alt="SwastikTech Logo" className="animated-3d-logo" width="100%" height="auto" />
          </div>
          <div className="badge badge-category" style={{ marginBottom: '16px', display: 'inline-block' }}>New Collection 2024</div>
          <h1 className="hero-title">
            The Future of <span className="text-gradient">Technology</span> Is Here
          </h1>
          <p className="hero-subtitle">
            Experience unparalleled performance and stunning design with our hand-picked selection of premium gadgets and accessories.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => {
              document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' });
            }}>
              Shop Now <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }}/>
            </button>
            <button className="btn-icon hero-secondary-btn">View Offers</button>
          </div>
        </div>
        
        <div className="hero-features glass-panel">
          <div className="feature-item">
            <Zap className="feature-icon" size={24} />
            <div>
              <h4>Lightning Fast</h4>
              <p className="text-muted text-sm">Same day delivery</p>
            </div>
          </div>
          <div className="feature-item">
            <Shield className="feature-icon" size={24} />
            <div>
              <h4>Secure Shopping</h4>
              <p className="text-muted text-sm">100% protected payments</p>
            </div>
          </div>
          <div className="feature-item">
            <Headphones className="feature-icon" size={24} />
            <div>
              <h4>24/7 Support</h4>
              <p className="text-muted text-sm">Always here for you</p>
            </div>
          </div>
        </div>
      </div>

      <div id="product-section">
        <div className="section-header" style={{ marginBottom: '20px' }}>
          <h2 className="section-title">Featured Tech</h2>
        </div>
        <ProductList limit={3} hideFilters={true} />
      </div>
    </>
  );
};

export default Home;
