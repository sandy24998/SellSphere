import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './CandidateDashboard.css';

const API = "http://localhost:5000/api/candidates";

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    pending: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load candidates on mount
  useEffect(() => {
    loadCandidates();
  }, []);

  // Calculate stats whenever candidates change
  useEffect(() => {
    calculateStats();
  }, [candidates]);

  const loadCandidates = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(API + "/list");
      setCandidates(res.data.candidates || []);
    } catch (err) {
      console.error("Error loading candidates:", err);
      setCandidates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = () => {
    const total = candidates.length;
    const active = candidates.filter((c) => c.status === "ACTIVE").length;
    const inactive = candidates.filter((c) => c.status === "INACTIVE").length;
    const pending = candidates.filter((c) => c.status === "PENDING").length;

    setStats({ total, active, inactive, pending });
  };

  const StatCard = ({ title, value, color }) => (
    <div className={`stat-card stat-${color}`}>
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>📊 Candidate Management Dashboard</h1>
        <p className="subtitle">Overview and Quick Actions</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatCard title="Total Candidates" value={stats.total} color="blue" />
        <StatCard title="Active" value={stats.active} color="green" />
        <StatCard title="Inactive" value={stats.inactive} color="red" />
        <StatCard title="Pending" value={stats.pending} color="yellow" />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>🚀 Quick Actions</h2>
        <div className="action-buttons">
          <button 
            className="action-btn btn-add"
            onClick={() => navigate('/candidates/add')}
          >
            ➕ Add New Candidate
          </button>
          <button 
            className="action-btn btn-view"
            onClick={() => navigate('/candidates/list')}
          >
            📋 View All Candidates
          </button>
          <button 
            className="action-btn btn-refresh"
            onClick={loadCandidates}
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>

      {/* Recent Candidates */}
      <div className="recent-candidates">
        <h2>👥 Recent Candidates</h2>
        
        {isLoading ? (
          <p className="loading">Loading candidates...</p>
        ) : candidates.length === 0 ? (
          <div className="empty-state">
            <p>No candidates yet. Start by adding one!</p>
            <button 
              className="empty-action-btn"
              onClick={() => navigate('/candidates/add')}
            >
              Add First Candidate
            </button>
          </div>
        ) : (
          <div className="recent-list">
            {candidates.slice(0, 5).map((candidate) => (
              <div key={candidate._id} className="recent-item">
                <div className="item-left">
                  <h4>{candidate.name}</h4>
                  <p className="item-meta">
                    {candidate.phone} • {candidate.experience} yrs exp
                  </p>
                </div>
                <div className="item-right">
                  <span className={`status-badge status-${candidate.status.toLowerCase()}`}>
                    {candidate.status}
                  </span>
                  <button
                    className="view-btn"
                    onClick={() => navigate('/candidates/list')}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dashboard Info */}
      <div className="dashboard-info">
        <h2>ℹ️ System Information</h2>
        <div className="info-grid">
          <div className="info-card">
            <h4>Add Candidates</h4>
            <p>Create a new candidate record with all required details including skills, education, and experience.</p>
            <button onClick={() => navigate('/candidates/add')}>Go to Add Page →</button>
          </div>
          <div className="info-card">
            <h4>Manage Candidates</h4>
            <p>View, search, filter, and sort all candidates. Edit or delete candidate records as needed.</p>
            <button onClick={() => navigate('/candidates/list')}>Go to List Page →</button>
          </div>
          <div className="info-card">
            <h4>Real-Time Updates</h4>
            <p>All changes are saved immediately to the database. Use the refresh button to see latest updates.</p>
            <button onClick={loadCandidates}>Refresh Now →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
