import React, { useState, useEffect } from "react";
import axios from "axios";

function CandidateForm() {
  const [students, setStudents] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Available skills list
  const availableSkills = [
    "JavaScript", "React", "Node.js", "Python",
    "Java", "MongoDB", "SQL", "AWS",
    "C++", "HTML", "CSS"
  ];

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    level: "",
    experience: "",
    skills: []
  });

  // Fetch students from backend
  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/candidates/get",
        { params: filters }
      );

      setStudents(response.data.students || []);
      setSuccess(response.data.message || "Students fetched successfully");
      setError("");
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.message || "Failed to fetch students");
    }
  };

  // Handle simple input filters
  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle skills checkbox selection
  const handleSkillChange = (e) => {
    const { value, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value] // add skill
        : prev.skills.filter((skill) => skill !== value), // remove skill
    }));
  };

  // Refetch whenever filters change
  useEffect(() => {
    fetchStudents();
  }, [filters]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Candidate Filters</h2>

      {/* Filter Inputs */}
      <input
        type="text"
        name="name"
        placeholder="Filter by Name"
        value={filters.name}
        onChange={handleFilters}
      />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Filter by Email"
        value={filters.email}
        onChange={handleFilters}
      />
      <br />

      <input
        type="text"
        name="level"
        placeholder="Filter by Level"
        value={filters.level}
        onChange={handleFilters}
      />
      <br />

      <input
        type="text"
        name="experience"
        placeholder="Filter by Experience"
        value={filters.experience}
        onChange={handleFilters}
      />
      <br /><br />

      {/* Skills Filter */}
      <h3>Skills (Select 1+):</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {availableSkills.map((skill) => (
          <label key={skill}>
            <input
              type="checkbox"
              value={skill}
              checked={filters.skills.includes(skill)}
              onChange={handleSkillChange}
            />
            {skill}
          </label>
        ))}
      </div>

      {/* Messages */}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Candidate List</h2>

      {students.length === 0 && <p>No students found</p>}

      {students.map((student) => (
        <div
          key={student._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "10px 0",
          }}
        >
          <p><b>Name:</b> {student.name}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Experience:</b> {student.experience}</p>
          <p><b>Level:</b> {student.level}</p>
          <p><b>Skills:</b> {student.skills?.join(", ") || "None"}</p>
        </div>
      ))}
    </div>
  );
}

export default CandidateForm;
