import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCandidate.css';

const ALL_SKILLS = [
  'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js',
  'HTML', 'CSS', 'Python', 'Java', 'C++',
  'SQL', 'REST API', 'Git', 'Docker', 'AWS'
];

const AddCandidate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    skills: [],
    experience: 0,
    education: '',
    certification: '',
    college: '',
    status: 'ACTIVE',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experience' ? Number(value) : value
    }));
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const isFormValid =
  formData.name.trim() &&
  /^[0-9]{10}$/.test(formData.phone) &&
  formData.address.trim() &&
  formData.education.trim() &&
  formData.college.trim() &&
  formData.skills.length > 0;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.phone || !formData.address || !formData.education || !formData.college) {
      setError('All required fields must be filled');
      return;
    }

    if (formData.skills.length === 0) {
      setError('Please select at least one skill');
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError('Phone must be 10 digits');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/candidates/add', formData);
      navigate('/candidates/list');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add candidate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-candidate-page">
      <div className="add-candidate-container">
        <h1>Add New Candidate</h1>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="candidate-form">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                required
              />
            </div>

            <div className="form-group">
              <label>Experience (Years) *</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address *</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Full address"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Education *</label>
            <input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="e.g., B.Tech Computer Science"
              required
            />
          </div>

          <div className="form-group">
            <label>College *</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="College name"
              required
            />
          </div>

          <div className="form-group">
            <label>Certification</label>
            <input
              type="text"
              name="certification"
              value={formData.certification}
              onChange={handleChange}
              placeholder="Optional: AWS, GCP, etc."
            />
          </div>

          <div className="form-group">
            <label>Skills * (Select at least one)</label>
            <div className="skills-grid">
              {ALL_SKILLS.map(skill => (
                <label key={skill} className="skill-checkbox">
                  <input
                    type="checkbox"
                    checked={formData.skills.includes(skill)}
                    onChange={() => handleSkillToggle(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>

          <button type="submit" disabled={loading || !isFormValid} className="submit-button">
            {loading ? 'Adding...' : 'Add Candidate'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
