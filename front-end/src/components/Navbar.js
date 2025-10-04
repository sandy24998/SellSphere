import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => { 
    const location = useLocation();
    
    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <header className="navbar">
            <nav className="nav-container">
                <div className="logo">
                    <Link to="/">
                        <span className="logo-text">🚀 Sell Sphere</span>
                    </Link>
                </div>
                <ul className="nav-links">
                    <li>
                        <Link to="/" className={isActive('/')}>
                            <span className="nav-text">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/products" className={isActive('/products')}>
                            <span className="nav-text">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/addProduct" className={isActive('/addProduct')}>
                            <span className="nav-text">Add Product</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;