import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../api';
import ProductUpdate from './ProductUpdate';

const ProductList = ({ refresh }) => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      const query = {};
      if (filter) query.productName = filter;
      if (sortOption) query.sortBy = sortOption;
      const data = await fetchProducts(query);
      setProducts(data.products || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch products');
    }
  };

  useEffect(() => {
    loadProducts();
  }, [refresh, filter, sortOption]);

  return (
    <div className="product-list card">
      <div className="filters">
        <input
          type="text"
          placeholder="Filter by product name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="">Sort By</option>
          <option value="lowerCostPrice">Cost Price (Low to High)</option>
          <option value="higherCostPrice">Cost Price (High to Low)</option>
          <option value="lowerSoldPrice">Sold Price (Low to High)</option>
          <option value="higherSoldPrice">Sold Price (High to Low)</option>
        </select>
      </div>
      {error && <p className="error">{error}</p>}
      <ul className="product-items">
        {products.map((product) => (
          <li key={product._id} className="product-item">
            <span>{product.productName} - Cost: ${product.costPrice} - Sold: ${product.soldPrice}</span>
            <ProductUpdate productId={product._id} onUpdate={loadProducts} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;