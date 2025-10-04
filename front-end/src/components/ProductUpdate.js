import axios from 'axios';
import React, { useState } from 'react';
import './ProductUpdate.css';

const ProductUpdate = ({productId, onUpdate}) => {
    const [soldPrice, setSoldPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await axios.patch(
                `http://localhost:5000/api/sellProduct/${productId}`, 
                { soldPrice: Number(soldPrice) } 
            );
            setSoldPrice('');
            onUpdate();
        } catch (error) {
            console.error('Error updating product:', error); 
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setIsLoading(true);
            try {
                await axios.delete(
                    `http://localhost:5000/api/sellProduct/${productId}`
                );
                onUpdate();
            } catch (error) {
                console.error('Error deleting product:', error); 
            } finally {
                setIsLoading(false);
            }
        }
    }

    return (
        <div className="product-update-container">
            <div className="input-group">
                <input 
                    value={soldPrice}
                    type="number"
                    name="soldPrice"
                    placeholder="Enter new price"
                    onChange={(e) => setSoldPrice(e.target.value)}
                    className="price-input"
                    min="0"
                    step="0.01"
                />
                <button 
                    type="button"
                    disabled={!soldPrice || Number(soldPrice) <= 1 || isLoading}
                    onClick={handleUpdate}
                    className="update-button"
                >
                    {isLoading ? 'Updating...' : 'Update Price'}
                </button>
            </div>
            <button 
                type="button"
                onClick={handleDelete}
                className="delete-button"
                disabled={isLoading}
            >
                {isLoading ? 'Deleting...' : 'Delete Product'}
            </button>
        </div>
    );
}

export default ProductUpdate;