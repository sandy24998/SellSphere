import React, { useState } from 'react';
import axios from 'axios';
import './CandidateCard.css';

const ALL_SKILLS = [
  'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js',
  'HTML', 'CSS', 'Python', 'Java', 'C++',
  'SQL', 'REST API', 'Git', 'Docker', 'AWS'
];

const CandidateCard = ({ candidate, onUpdateSuccess, onDelete }) => {
  
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    name: candidate.name || '',
    phone: candidate.phone || '',
    address: candidate.address || '',
    education: candidate.education || '',
    college: candidate.college || '',
    certification: candidate.certification || '',
    experience: Number(candidate.experience) || 0,
    status: candidate.status || 'PENDING',
    skills: Array.isArray(candidate.skills) ? candidate.skills : []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: name === 'experience' ? Number(value) : value
    }));
  };

  const handleSkillToggle = (skill) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSave = async () => {
    setError("");

    // Required fields
    const required = ["name", "phone", "address", "education", "college"];
    for (const field of required) {
      if (!editData[field]) {
        setError("All required fields must be filled");
        return;
      }
    }

    if (!/^[0-9]{10}$/.test(editData.phone)) {
      setError("Phone must be 10 digits");
      return;
    }

    if (editData.skills.length === 0) {
      setError("Please select at least one skill");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `http://localhost:5000/api/candidates/update/${candidate._id}`,
        editData
      );
      setIsEditing(false);
      onUpdateSuccess();
    } catch (err) {
      setError(err.response?.data?.error || "Error updating candidate");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      onDelete(candidate._id);
    }
  };

  return (
    <div className="candidate-card">

      {error && <div className="error-message">{error}</div>}

      {!isEditing ? (
        <>
          {/* ----- VIEW MODE ----- */}
          <div className="card-header">
            <h2>{candidate.name || 'Unnamed'}</h2>
            <span className={`status-badge status-${candidate.status?.toLowerCase()}`}>
              {candidate.status}
            </span>
          </div>

          <div className="card-content">
            <div className="info-row"><span className="label">Phone:</span> <span className="value">{candidate.phone}</span></div>
            <div className="info-row"><span className="label">Address:</span> <span className="value">{candidate.address}</span></div>
            <div className="info-row"><span className="label">Experience:</span> <span className="value">{candidate.experience} years</span></div>
            <div className="info-row"><span className="label">Education:</span> <span className="value">{candidate.education}</span></div>
            <div className="info-row"><span className="label">College:</span> <span className="value">{candidate.college}</span></div>
            {candidate.certification && (
              <div className="info-row">
                <span className="label">Certification:</span>
                <span className="value">{candidate.certification}</span>
              </div>
            )}

            <div className="skills">
              <span className="label">Skills:</span>
              <div className="skill-list">
                {candidate.skills?.map(skill => (
                  <span key={skill} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="card-actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>✎ Edit</button>
            <button className="delete-btn" onClick={handleDeleteClick}>🗑️ Delete</button>
          </div>
        </>
      ) : (
        <>
          {/* ----- EDIT MODE ----- */}
          <div className="card-edit">
            <h3>Edit Candidate</h3>

            <div className="edit-form">
              {/** Inputs */}
              <div className="form-group">
                <label>Name *</label>
                <input name="name" value={editData.name} onChange={handleChange} className="edit-input" />
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input name="phone" value={editData.phone} onChange={handleChange} className="edit-input" />
              </div>

              <div className="form-group">
                <label>Address *</label>
                <textarea name="address" value={editData.address} onChange={handleChange} className="edit-input" />
              </div>

              <div className="form-group">
                <label>Education *</label>
                <input name="education" value={editData.education} onChange={handleChange} className="edit-input" />
              </div>

              <div className="form-group">
                <label>College *</label>
                <input name="college" value={editData.college} onChange={handleChange} className="edit-input" />
              </div>

              <div className="form-group">
                <label>Certification</label>
                <input name="certification" value={editData.certification} onChange={handleChange} className="edit-input" />
              </div>

              <div className="form-group">
                <label>Experience</label>
                <input type="number" name="experience" value={editData.experience} onChange={handleChange} className="edit-input" />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select name="status" value={editData.status} onChange={handleChange} className="edit-input">
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>

              <div className="form-group">
                <label>Skills *</label>
                <div className="skills-grid">
                  {ALL_SKILLS.map(skill => (
                    <label key={skill}>
                      <input type="checkbox" checked={editData.skills.includes(skill)} onChange={() => handleSkillToggle(skill)} />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="edit-actions">
              <button className="cancel-btn" onClick={() => { setIsEditing(false); setError(""); }}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateCard;
