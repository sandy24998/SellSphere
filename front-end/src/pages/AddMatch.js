import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";

const AddMatch = () => {
  const [formData, setFormData] = useState({
    teamA: "",
    teamB: "",
    sport: "",
    league: "",
    venue: "",
  });

  const [ErrorMsg, setErrorMsg] = useState("");
  const [SuccessMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/matches/add",
        formData
      );

      setSuccessMsg("Match added successfully!");
      setErrorMsg("");
      setTimeout(() => {
        setSuccessMsg("");
      }, 2000);
    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Failed to add match");
      setSuccessMsg("");
      setTimeout(() => {
        setErrorMsg("");
      }, 2000);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Add New Match</h2>

      {SuccessMsg && <p style={{ color: "green" }}>✔ {SuccessMsg}</p>}
      {ErrorMsg && <p style={{ color: "red" }}>❌ {ErrorMsg}</p>}

      <form onSubmit={handleSubmit} style={{ width: "350px" }}>
        <label>Team A:</label>
        <input
          type="text"
          name="teamA"
          value={formData.teamA}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Team B:</label>
        <input
          type="text"
          name="teamB"
          value={formData.teamB}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Sport:</label>
        <input
          type="text"
          name="sport"
          value={formData.sport}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>League:</label>
        <input
          type="text"
          name="league"
          value={formData.league}
          onChange={handleChange}
        />

        <br />
        <br />

        <label>Venue:</label>
        <input
          type="text"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Add Match</button>
      </form>
    </div>
  );
};

export default AddMatch;
