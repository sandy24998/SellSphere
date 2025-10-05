import React from 'react';
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import './Home.css';

const Home = () => (
  <div className="home">
    <Navbar/>
    <main className="hero-section">
      <div className="hero-content">
        <h1>Welcome to Sell Sphere - PR TEST</h1>
        <p className="hero-subtitle">Track your products efficiently</p>
        <div className="cta-buttons">
          <Link to="/products" className="cta-button primary">View Products</Link>
          <Link to="/addProduct" className="cta-button secondary">Add New Product</Link>
        </div>
      </div>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <h3>Track products</h3>
            <p>Monitor your products in real-time</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Calculate Profits</h3>
            <p>Automatically calculate profit margins</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📈</span>
            <h3>Analytics</h3>
            <p>View detailed sales analytics</p>
          </div>
        </div>
      </section>
    </main>
  </div>
);

export default Home;