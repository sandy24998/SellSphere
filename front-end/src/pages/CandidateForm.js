import React, { useState, useEffect } from "react";
import axios from "axios";

function CandidateForm() {
  const [students, setStudents] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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

  const [editingStudent, setEditingStudent] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    email: "",
    experience: "",
    level: "",
    skills: []
  });

  // GET STUDENTS
  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/candidates/get", {
        params: filters,
      });

      setStudents(res.data.students || []);
      setSuccess("Fetched successfully");
      setError("");
    } catch (err) {
      setError("Failed to fetch");
      setSuccess("");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  // ----------- FILTER HANDLERS -----------

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setFilters((p) => ({ ...p, [name]: value }));
  };

  const handleSkillFilterChange = (e) => {
    const { value, checked } = e.target;
    setFilters((p) => ({
      ...p,
      skills: checked
        ? [...p.skills, value]
        : p.skills.filter((skill) => skill !== value),
    }));
  };

  // ---------- DELETE STUDENT ----------
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/candidates/delete/${id}`);
      setSuccess("Deleted successfully");
      fetchStudents();
    } catch {
      setError("Delete failed");
    }
  };

  // ---------- START UPDATE ----------
  const startUpdate = (student) => {
    setEditingStudent(student._id);
    setUpdateData({
      name: student.name,
      email: student.email,
      experience: student.experience,
      level: student.level,
      skills: student.skills || [],
    });
  };

  // ---------- UPDATE FORM HANDLERS ----------
  const handleUpdateInput = (e) => {
    const { name, value } = e.target;
    setUpdateData((p) => ({ ...p, [name]: value }));
  };

  const handleUpdateSkillChange = (e) => {
    const { value, checked } = e.target;

    setUpdateData((p) => ({
      ...p,
      skills: checked
        ? [...p.skills, value]
        : p.skills.filter((s) => s !== value),
    }));
  };

  // ---------- UPDATE STUDENT ----------
  const updateStudent = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/candidates/update/${editingStudent}`,
        updateData
      );

      setSuccess("Updated successfully");
      setEditingStudent(null);
      fetchStudents();
    } catch {
      setError("Update failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      
      <h2>Candidate Filters</h2>

      {/* SIMPLE FILTERS */}
      <input name="name" value={filters.name} onChange={handleFilters} placeholder="Filter by name" /><br />
      <input name="email" value={filters.email} onChange={handleFilters} placeholder="Filter by email" /><br />
      <input name="level" value={filters.level} onChange={handleFilters} placeholder="Filter by level" /><br />
      <input name="experience" value={filters.experience} onChange={handleFilters} placeholder="Filter by experience" /><br /><br />

      {/* SKILL FILTERS */}
      <h3>Skills</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {availableSkills.map((skill) => (
          <label key={skill}>
            <input
              type="checkbox"
              value={skill}
              checked={filters.skills.includes(skill)}
              onChange={handleSkillFilterChange}
            />
            {skill}
          </label>
        ))}
      </div>

      {/* MESSAGES */}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Candidate List</h2>

      {students.length === 0 && <p>No candidates found</p>}

      {students.map((student) => (
        <div
          key={student._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "15px",
          }}
        >
          <p><b>Name:</b> {student.name}</p>
          <p><b>Email:</b> {student.email}</p>
          <p><b>Experience:</b> {student.experience}</p>
          <p><b>Level:</b> {student.level}</p>
          <p><b>Skills:</b> {student.skills?.join(", ")}</p>

          {/* ACTION BUTTONS */}
          <button onClick={() => startUpdate(student)}>Update</button>
          <button
            style={{ marginLeft: "10px", background: "red", color: "white" }}
            onClick={() => deleteStudent(student._id)}
          >
            Delete
          </button>

          {/* UPDATE FORM FOR THIS STUDENT */}
          {editingStudent === student._id && (
            <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #aaa" }}>
              <h3>Update Candidate</h3>

              <input
                name="name"
                value={updateData.name}
                onChange={handleUpdateInput}
                placeholder="Name"
              /><br />

              <input
                name="email"
                value={updateData.email}
                onChange={handleUpdateInput}
                placeholder="Email"
              /><br />

              <input
                name="experience"
                value={updateData.experience}
                onChange={handleUpdateInput}
                placeholder="Experience"
              /><br />

              <input
                name="level"
                value={updateData.level}
                onChange={handleUpdateInput}
                placeholder="Level"
              /><br /><br />

              <h4>Skills</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {availableSkills.map((skill) => (
                  <label key={skill}>
                    <input
                      type="checkbox"
                      value={skill}
                      checked={updateData.skills.includes(skill)}
                      onChange={handleUpdateSkillChange}
                    />
                    {skill}
                  </label>
                ))}
              </div>

              <br />
              <button onClick={updateStudent}>Save</button>
              <button style={{ marginLeft: "10px" }} onClick={() => setEditingStudent(null)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CandidateForm;
