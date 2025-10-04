import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import './AddProduct.css';

const AddProduct = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        productName: '',
        costPrice: '',
        soldPrice: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.productName || !formData.costPrice || !formData.soldPrice) {
            setError('All fields are required');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/sellProduct', {
                productName: formData.productName,
                costPrice: Number(formData.costPrice),
                soldPrice: Number(formData.soldPrice)
            });
            navigate('/products');
        } catch (error) {
            setError('Error adding product. Please try again.');
        }
    };

    return (
        <div className="add-product-page">
            <Navbar />
            <div className="add-product-container">
                <h1>Add New Product</h1>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            name="productName"
                            id="productName"
                            value={formData.productName}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            minLength="3"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="costPrice">Cost Price</label>
                        <input
                            type="number"
                            name="costPrice"
                            id="costPrice"
                            value={formData.costPrice}
                            onChange={handleChange}
                            placeholder="Enter cost price"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="soldPrice">Selling Price</label>
                        <input
                            type="number"
                            name="soldPrice"
                            id="soldPrice"
                            value={formData.soldPrice}
                            onChange={handleChange}
                            placeholder="Enter selling price"
                            min="0"
                            step="0.01"
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;