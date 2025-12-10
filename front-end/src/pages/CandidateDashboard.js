import React, { useState, useEffect } from "react";
import axios from "axios";

// Backend API Base URL
const API = "http://localhost:5000/api/candidates";

// All available skills
const ALL_SKILLS = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "MongoDB",
  "SQL",
  "AWS",
  "C++",
  "HTML",
  "CSS",
];

export default function CandidateDashboard() {
  const [candidates, setCandidates] = useState([]);

  // SEARCH Filters
  const [search, setSearch] = useState({
    name: "",
    email: "",
    level: "",
    experience: "",
    skills: [],
  });

  // NEW Candidate form
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    experience: "",
    level: "",
    skills: [],
  });

  // EDIT Popup
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    experience: "",
    level: "",
    skills: [],
  });

  const [sortBy, setSortBy] = useState("name-asc");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Show popup message
  const showMsg = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 4000);
  };

  // Fetch data whenever search filters change
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(API + "/get", { params: search });
        setCandidates(res.data.students || []);
      } catch (err) {
        showMsg("Error loading data");
        setCandidates([]);
      }
      setIsLoading(false);
    };
    getData();
  }, [search]);

  // ------------------------------------------
  // ✅ CLEAN NEW TOGGLE HANDLERS
  // ------------------------------------------

  const handleSearchSkill = (skill) => {
    setSearch((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleNewSkill = (skill) => {
    setNewCandidate((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleEditSkill = (skill) => {
    setEditForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  // ADD Candidate
  const addCandidate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API + "/add", {
        ...newCandidate,
        experience: Number(newCandidate.experience) || 0,
      });

      showMsg("Candidate added!");

      // clear form
      setNewCandidate({
        name: "",
        email: "",
        experience: "",
        level: "",
        skills: [],
      });

      // Reload
      const res = await axios.get(API + "/get", { params: search });
      setCandidates(res.data.students);
    } catch (err) {
      showMsg("Failed to add");
    }
  };

  // DELETE Candidate
  const deleteCandidate = async (id) => {
    if (!window.confirm("Delete this candidate?")) return;
    try {
      await axios.delete(API + "/delete/" + id);
      showMsg("Deleted!");
      setCandidates(candidates.filter((c) => c._id !== id));
    } catch {
      showMsg("Delete failed");
    }
  };

  // OPEN edit popup
  const openEdit = (person) => {
    setEditingId(person._id);
    setEditForm({
      name: person.name,
      email: person.email,
      experience: person.experience?.toString() || "",
      level: person.level || "",
      skills: [...person.skills] || [],
    });
    setShowEditPopup(true);
  };

  // SAVE edit changes
  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(API + "/update/" + editingId, {
        ...editForm,
        experience: Number(editForm.experience) || 0,
      });

      showMsg("Updated!");

      // close modal
      setShowEditPopup(false);

      // reload list
      const res = await axios.get(API + "/get", { params: search });
      setCandidates(res.data.students);
    } catch (err) {
      showMsg("Update failed");
    }
  };

  // SORTING LOGIC
  const sortedList = [...candidates].sort((a, b) => {
    if (sortBy === "name-asc")
      return (a.name || "").localeCompare(b.name || "");
    if (sortBy === "name-desc")
      return (b.name || "").localeCompare(a.name || "");
    if (sortBy === "exp-asc") return (a.experience || 0) - (b.experience || 0);
    if (sortBy === "exp-desc") return (b.experience || 0) - (a.experience || 0);
    return 0;
  });

  return (
    <div
      style={{
        padding: 20,
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Candidate Dashboard</h1>

      {message && (
        <div
          style={{
            padding: 10,
            background: "#d4edda",
            color: "green",
            borderRadius: 6,
            marginBottom: 15,
          }}
        >
          {message}
        </div>
      )}

      <div style={{ display: "flex", gap: 30, flexWrap: "wrap" }}>
        {/* LEFT FILTERS */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Search Filters</h3>

          <input
            placeholder="Name"
            value={search.name}
            onChange={(e) => setSearch({ ...search, name: e.target.value })}
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />

          <input
            placeholder="Email"
            value={search.email}
            onChange={(e) => setSearch({ ...search, email: e.target.value })}
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />

          <input
            placeholder="Level"
            value={search.level}
            onChange={(e) => setSearch({ ...search, level: e.target.value })}
            style={{ width: "100%", padding: 8, marginBottom: 8 }}
          />

          <input
            placeholder="Experience"
            value={search.experience}
            onChange={(e) =>
              setSearch({ ...search, experience: e.target.value })
            }
            style={{ width: "100%", padding: 8, marginBottom: 12 }}
          />

          <strong>Skills:</strong>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 10,
            }}
          >
            {ALL_SKILLS.map((skill) => (
              <label key={skill}>
                <input
                  type="checkbox"
                  checked={search.skills.includes(skill)}
                  onChange={() => handleSearchSkill(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* RIGHT Add Form */}
        <div style={{ width: 320 }}>
          <h3>Add New Candidate</h3>
          <form onSubmit={addCandidate}>
            <input
              placeholder="Name"
              value={newCandidate.name}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, name: e.target.value })
              }
              required
              style={{ width: "100%", padding: 8, marginBottom: 8 }}
            />

            <input
              placeholder="Email"
              value={newCandidate.email}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, email: e.target.value })
              }
              required
              style={{ width: "100%", padding: 8, marginBottom: 8 }}
            />

            <input
              placeholder="Experience"
              value={newCandidate.experience}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, experience: e.target.value })
              }
              style={{ width: "100%", padding: 8, marginBottom: 8 }}
            />

            <input
              placeholder="Level"
              value={newCandidate.level}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, level: e.target.value })
              }
              style={{ width: "100%", padding: 8, marginBottom: 12 }}
            />

            <strong>Skills:</strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 6,
              }}
            >
              {ALL_SKILLS.map((skill) => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    checked={newCandidate.skills.includes(skill)}
                    onChange={() => handleNewSkill(skill)}
                  />
                  {skill}
                </label>
              ))}
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: 10,
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: 6,
                marginTop: 12,
              }}
            >
              Add Candidate
            </button>
          </form>

          <div style={{ marginTop: 25 }}>
            <strong>Sort by:</strong>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 8 }}
            >
              <option value="name-asc">Name A → Z</option>
              <option value="name-desc">Name Z → A</option>
              <option value="exp-asc">Experience Low → High</option>
              <option value="exp-desc">Experience High → Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* LIST */}
      <h2 style={{ marginTop: 40 }}>
        All Candidates {isLoading && "(Loading...)"}
      </h2>

      {sortedList.length === 0 ? (
        <p>No candidates found</p>
      ) : (
        sortedList.map((person) => (
          <div
            key={person._id}
            style={{
              border: "1px solid #ccc",
              padding: 15,
              marginBottom: 15,
              borderRadius: 8,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3>{person.name}</h3>
              <p>
                <strong>Email:</strong> {person.email}
              </p>
              <p>
                <strong>Experience:</strong> {person.experience || 0} years |
                <strong> Level:</strong> {person.level || "-"}
              </p>
              <p>
                <strong>Skills:</strong> {person.skills?.join(", ") || "None"}
              </p>
            </div>

            <div>
              <button
                onClick={() => openEdit(person)}
                style={{
                  padding: "8px 16px",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  marginBottom: 8,
                  borderRadius: 4,
                }}
              >
                Edit
              </button>
              <br />
              <button
                onClick={() => deleteCandidate(person._id)}
                style={{
                  padding: "8px 16px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {/* EDIT POPUP */}
      {showEditPopup && (
        <div
          onClick={() => setShowEditPopup(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "white",
              padding: 30,
              borderRadius: 10,
              width: 500,
              maxWidth: "95%",
            }}
          >
            <h2>Edit Candidate</h2>

            <form onSubmit={saveEdit}>
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
                placeholder="Name"
                style={{ width: "100%", padding: 10, marginBottom: 10 }}
              />

              <input
                value={editForm.email}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                placeholder="Email"
                style={{ width: "100%", padding: 10, marginBottom: 10 }}
              />

              <input
                value={editForm.experience}
                onChange={(e) =>
                  setEditForm({ ...editForm, experience: e.target.value })
                }
                placeholder="Experience"
                style={{ width: "100%", padding: 10, marginBottom: 10 }}
              />

              <input
                value={editForm.level}
                onChange={(e) =>
                  setEditForm({ ...editForm, level: e.target.value })
                }
                placeholder="Level"
                style={{ width: "100%", padding: 10, marginBottom: 15 }}
              />

              <strong>Skills:</strong>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  margin: "10px 0",
                }}
              >
                {ALL_SKILLS.map((skill) => (
                  <label key={skill}>
                    <input
                      type="checkbox"
                      checked={editForm.skills.includes(skill)}
                      onChange={() => handleEditSkill(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>

              <div style={{ textAlign: "right", marginTop: 20 }}>
                <button
                  type="button"
                  onClick={() => setShowEditPopup(false)}
                  style={{ padding: "10px 20px", marginRight: 10 }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    background: "#28a745",
                    color: "white",
                    border: "none",
                  }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
