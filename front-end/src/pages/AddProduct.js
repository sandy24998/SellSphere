import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';

const AddProduct = ({ onProductAdded }) => {
  return (
    <div className="add-product-page">
      <h1>Add New Product</h1>
      <ProductForm onProductAdded={onProductAdded} />
    </div>
  );
};

export default AddProduct;