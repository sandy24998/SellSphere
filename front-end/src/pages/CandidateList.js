import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CandidateList.css';
import CandidateCard from '../Components/CandidateCard';

const ALL_SKILLS = [
  'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js',
  'HTML', 'CSS', 'Python', 'Java', 'C++',
  'SQL', 'REST API', 'Git', 'Docker', 'AWS'
];

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('name');


  useEffect(() => {
  loadCandidates();
}, [searchTerm, selectedSkills, selectedStatus, sortBy]);

  const loadCandidates = async () => {
  try {
    setLoading(true);
    const response = await axios.get('http://localhost:5000/api/candidates/list', {
      params: {
        name: searchTerm || undefined,
        skills: selectedSkills.length ? selectedSkills.join(",") : undefined,
        status: selectedStatus || undefined,
        sort: sortBy,
        limit: 20
      }
    });
    setCandidates(response.data.candidates || []);
  } catch (error) {
    console.error("Error loading candidates:", error);
    setCandidates([]);
  } finally {
    setLoading(false);
  }
};
  
  const handleDeleteCandidate = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await axios.delete(`http://localhost:5000/api/candidates/delete/${id}`);
        loadCandidates();
      } catch (error) {
        alert('Error deleting candidate');
      }
    }
  };

  const handleSkillFilter = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedSkills([]);
    setSelectedStatus('');
    setSortBy('name');
  };

  return (
    <div className="candidate-list-page">
      <div className="candidate-list-container">
        <h1>Candidate List</h1>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="🔍 Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-controls">
            <div className="filter-group">
              <label>Sort By:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="name">Name</option>
                <option value="experience">Experience</option>
                <option value="recent">Most Recent</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Status:</label>
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="">All Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>

            <button onClick={handleResetFilters} className="reset-button">
              Reset Filters
            </button>
          </div>

          <div className="skill-filter">
            <p>Filter by Skills:</p>
            <div className="skill-tags">
              {ALL_SKILLS.map(skill => (
                <button
                  key={skill}
                  className={`skill-tag ${selectedSkills.includes(skill) ? 'active' : ''}`}
                  onClick={() => handleSkillFilter(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="results-count">
            Found: <strong>{candidates.length}</strong> candidates
          </div>
        </div>

        {/* Candidates Grid */}
        {loading ? (
          <div className="loading">Loading candidates...</div>
        ) : candidates.length > 0 ? (
          <div className="candidates-grid">
            {candidates.map(candidate => (
              <CandidateCard
                key={candidate._id}
                candidate={candidate}
                onDelete={handleDeleteCandidate}
                onUpdateSuccess={loadCandidates}
              />
            ))}
          </div>
        ) : (
          <div className="no-candidates">
            <p>No candidates found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
