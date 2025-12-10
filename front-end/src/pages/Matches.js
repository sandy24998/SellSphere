import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Matches = () => {
  const navigate = useNavigate();

  const [Matches, setMatches] = useState([]);

  const [filters, setFilters] = useState({
    sport: "",
    league: "",
    venue: "",
    sort: "",
    limit: "",
  });

  const [updateForm, setupdateForm] = useState({
    teamA: "",
    teamB: "",
    sport: "",
    league: "",
    venue: "",
  });

  const [ErrorMsg, setErrorMsg] = useState("");
  const [SuccessMsg, setSuccessMsg] = useState("");
  const [EditStatus, setEditStatus] = useState(false);
  const [MatchId, setMatchId] = useState("");

  // -------------------------------
  // FETCH MATCHES (with filters)
  // -------------------------------
  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/matches/list",
        { params: filters }
      );

      setMatches(response.data.matches || []);

      if (response.data.message) {
        setSuccessMsg(response.data.message);
        setTimeout(() => setSuccessMsg(""), 2000);
      }

      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Failed to load matches");
      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [filters]); // Auto refresh when filters change

  // -------------------------------
  // Handle Filter & Sort Change
  // -------------------------------
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      sport: "",
      league: "",
      venue: "",
      sort: "",
      limit: "",
    });
  };

  // -------------------------------
  // EDIT MATCH
  // -------------------------------
  const handleEditUpdate = (match) => {
    setMatchId(match._id);
    setEditStatus(true);

    setupdateForm({
      teamA: match.teamA,
      teamB: match.teamB,
      sport: match.sport,
      league: match.league,
      venue: match.venue,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setupdateForm({ ...updateForm, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/matches/update/${MatchId}`,
        updateForm
      );
      setSuccessMsg(response.data.message);
      setErrorMsg("");
      setMatches((prev) =>
        prev.map((m) => (m._id === MatchId ? { ...m, ...updateForm } : m))
      );
      setEditStatus(false);
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Failed to update match");
      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  // -------------------------------
  // DELETE
  // -------------------------------
  const handleDelete = async (matchId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/matches/delete/${matchId}`
      );

      setSuccessMsg(response.data.message);
      setMatches((prev) => prev.filter((m) => m._id !== matchId));

      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Failed to delete match");
      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  return (
    <div>
      <Navbar />

      <button type="button" onClick={() => navigate("/add")}>
        Add Match
      </button>

      <h2>Match Filters</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="sport"
          placeholder="Filter by Sport"
          value={filters.sport}
          onChange={handleFilterChange}
        />

        <input
          type="text"
          name="league"
          placeholder="Filter by League"
          value={filters.league}
          onChange={handleFilterChange}
        />

        <input
          type="text"
          name="venue"
          placeholder="Filter by Venue"
          value={filters.venue}
          onChange={handleFilterChange}
        />

        <select name="sort" value={filters.sort} onChange={handleFilterChange}>
          <option value="">Sort by Date</option>
          <option value="asc">Oldest First</option>
          <option value="desc">Newest First</option>
        </select>

        <input
          type="number"
          name="limit"
          placeholder="Limit Results"
          value={filters.limit}
          onChange={handleFilterChange}
        />

        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <h2>Match List</h2>

      {SuccessMsg && <p style={{ color: "green" }}>✔ {SuccessMsg}</p>}
      {ErrorMsg && <p style={{ color: "red" }}>❌ {ErrorMsg}</p>}

      {Matches.length > 0 ? (
        Matches.map((match) => (
          <div
            key={match._id}
            style={{
              margin: "10px 0",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            <h3>
              {match.teamA} vs {match.teamB}
            </h3>
            <p>Sport: {match.sport}</p>
            <p>League: {match.league}</p>
            <p>Venue: {match.venue}</p>
            <p>Status: {match.status}</p>
            <p>
              Score: {match.score?.teamA} - {match.score?.teamB}
            </p>

            <button onClick={() => handleEditUpdate(match)}>Edit</button>{" "}
            <button onClick={() => handleDelete(match._id)}>Delete</button>
          </div>
        ))
      ) : (
        <p>No matches found.</p>
      )}

      {/* Edit Form */}
      {EditStatus && (
        <div>
          <h2>Update Match</h2>

          <form onSubmit={handleUpdate} style={{ width: "350px" }}>
            <label>Team A:</label>
            <input
              type="text"
              name="teamA"
              value={updateForm.teamA}
              onChange={handleChange}
            />

            <br />
            <br />

            <label>Team B:</label>
            <input
              type="text"
              name="teamB"
              value={updateForm.teamB}
              onChange={handleChange}
            />

            <br />
            <br />

            <label>Sport:</label>
            <input
              type="text"
              name="sport"
              value={updateForm.sport}
              onChange={handleChange}
            />

            <br />
            <br />

            <label>League:</label>
            <input
              type="text"
              name="league"
              value={updateForm.league}
              onChange={handleChange}
            />

            <br />
            <br />

            <label>Venue:</label>
            <input
              type="text"
              name="venue"
              value={updateForm.venue}
              onChange={handleChange}
            />

            <br />
            <br />

            <button type="submit">Update Match</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Matches;
