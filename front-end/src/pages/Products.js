import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import ProductUpdate from '../Components/ProductUpdate';
import Navbar from "../Components/Navbar";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);


    const loadProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/sellProduct');
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);


    const handleEditClick = (productId) => {
        setEditingId(editingId === productId ? null : productId);
    };


    const handleUpdateSuccess = () => {
        setEditingId(null);
        loadProducts();
    };

    return (
        <div className="products-page">
            <Navbar/>
            <div className="products-container">
                <div className="products-header">
                    <h1>Products List</h1>
                    <p className="products-subtitle">Manage your product inventory</p>
                </div>
                
                {loading ? (
                    <div className="loading-spinner">Loading...</div>
                ) : (
                    <div className="products-grid">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <div key={product._id} className="product-card">
                                    <div className="product-header">
                                        <h2 className="product-name">{product.productName}</h2>
                                        <button 
                                            className={`edit-toggle ${editingId === product._id ? 'active' : ''}`}
                                            onClick={() => handleEditClick(product._id)}
                                            title={editingId === product._id ? 'Close edit' : 'Edit product'}
                                        >
                                            {editingId === product._id ? '✕' : '✎'}
                                        </button>
                                    </div>
                                    <div className="product-details">
                                        <div className="price-row">
                                            <span className="label">Cost Price:</span>
                                            <span className="value">${product.costPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="price-row">
                                            <span className="label">Sold Price:</span>
                                            <span className="value">${product.soldPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="profit-row">
                                            <span className="label">Profit:</span>
                                            <span className="value profit">${(product.soldPrice - product.costPrice).toFixed(2)}</span>
                                        </div>
                                    </div>
                                     {editingId === product._id && (
                                        <div className="product-actions">
                                            <ProductUpdate 
                                                productId={product._id} 
                                                onUpdate={handleUpdateSuccess}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="no-products">
                                <span className="no-products-icon">📦</span>
                                <p>No products found</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
