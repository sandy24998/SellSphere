import React from 'react';
import ProductList from '../components/ProductList';

const Products = ({ refresh }) => {
  return (
    <div className="products-page">
      <h1>Product List</h1>
      <ProductList refresh={refresh} />
    </div>
  );
};

export default Products;