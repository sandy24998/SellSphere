import React, { useState } from 'react';
import { updateProduct, deleteProduct } from '../api';

const ProductUpdate = ({ productId, onUpdate }) => {
  const [soldPrice, setSoldPrice] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async () => {
    setError(null);
    setSuccess(null);
    try {
      const response = await updateProduct(productId, Number(soldPrice));
      setSuccess(response.message);
      setSoldPrice('');
      onUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
    }
  };

  const handleDelete = async () => {
    setError(null);
    setSuccess(null);
    try {
      const response = await deleteProduct(productId);
      setSuccess(response.message);
      onUpdate();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product');
    }
  };

  return (
    <div className="product-update">
      <input
        type="number"
        placeholder="New Sold Price"
        value={soldPrice}
        onChange={(e) => setSoldPrice(e.target.value)}
        min="1"
      />
      <button className="btn btn-secondary" onClick={handleUpdate}>Update</button>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      {success && <span className="success">{success}</span>}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default ProductUpdate;