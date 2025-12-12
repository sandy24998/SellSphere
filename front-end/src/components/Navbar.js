import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="navbar">
      <nav className="nav-container">
        <div className="logo">
          <Link to="/">
            <span className="logo-text">👥 Candidate Manager</span>
          </Link>
        </div>
        <ul className="nav-links">
          <li><Link to="/" className={isActive('/candidates')}>Dashboard</Link></li>
          <li><Link to="/candidates/list" className={isActive('/candidates/list')}>Candidates</Link></li>
          <li><Link to="/candidates/add" className={isActive('/candidates/add')}>Add Candidate</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
