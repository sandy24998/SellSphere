import React, { useState } from 'react';
import { createProduct } from '../api';

const ProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    productName: '',
    costPrice: '',
    soldPrice: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await createProduct({
        productName: formData.productName,
        costPrice: Number(formData.costPrice),
        soldPrice: Number(formData.soldPrice),
      });
      setSuccess(response.message);
      setFormData({ productName: '', costPrice: '', soldPrice: '' });
      onProductAdded();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add product');
    }
  };

  return (
    <div className="product-form card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Cost Price</label>
          <input
            type="number"
            name="costPrice"
            value={formData.costPrice}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Sold Price</label>
          <input
            type="number"
            name="soldPrice"
            value={formData.soldPrice}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ProductForm;