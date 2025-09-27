import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import './App.css';

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products refresh={refreshKey} />} />
            <Route path="/add-product" element={<AddProduct onProductAdded={handleProductAdded} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;