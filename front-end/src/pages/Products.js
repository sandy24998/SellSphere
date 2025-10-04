import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';
import ProductUpdate from '../Components/ProductUpdate';
import Navbar from "../Components/Navbar";

const Products = () => {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sellProduct');
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <div><Navbar/>
        <div className="products-container">
            <h1>Products List</h1>
            <div className="products-grid">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div key={product._id} className="product-card">
                            <p className="product-name">{product.productName}</p>
                            <p className="price">Cost Price: ${product.costPrice.toFixed(2)}</p>
                            <p className="price">Sold Price: ${product.soldPrice.toFixed(2)}</p>
                            <p className="profit">Profit: ${(product.soldPrice - product.costPrice).toFixed(2)}</p>
                            <ProductUpdate productId={product._id} onUpdate={loadProducts}/>
                        </div>
                    ))
                ) : (
                    <p className="no-products">No products found</p>
                )}
            </div>
        </div>
        </div>
    );
};

export default Products;