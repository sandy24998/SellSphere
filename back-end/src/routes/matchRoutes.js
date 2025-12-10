const express = require("express");
const Match = require("../models/Match");
const router = express.Router();

// =======================
//  POST — ADD MATCH
// =======================
router.post("/add", async (req, res) => {
  try {
    const { teamA, teamB, sport, venue, league } = req.body;
    if (!teamA || !teamB || !sport || !venue || !league) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (teamA.trim().toLowerCase() === teamB.trim().toLowerCase()) {
      return res
        .status(400)
        .json({ error: "teamA and teamB cannot be the same" });
    }
    const newMatch = new Match({
      teamA: teamA.trim(),
      teamB: teamB.trim(),
      sport: sport.trim(),
      venue: venue.trim(),
      league: league.trim(),
      startedAt: new Date(),
      status: "live",
      score: { teamA: 0, teamB: 0 },
    });
    const savedMatch = await newMatch.save();
    return res.status(201).json(savedMatch);
  } catch (error) {
    console.error("Error creating match:", error);
    return res.status(500).json({
      error: "Failed to create match",
      details: error.message,
    });
  }
});

// =======================
//  PATCH — UPDATE MATCH
// =======================
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Match ID is required" });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    const requiredFields = ["teamA", "teamB", "sport", "venue", "league"];
    for (const field of requiredFields) {
      if (req.body[field] === "") {
        return res.status(400).json({ error: `${field} cannot be empty` });
      }
    }
    
    const updatedMatch = await Match.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMatch) {
      return res.status(404).json({ error: "Match not found" });
    }
    return res.status(200).json({
      message: "Match updated successfully",
      updatedMatch,
    });
  } catch (error) {
    console.error("Error updating match:", error);
    return res.status(500).json({
      error: "Failed to update match",
      details: error.message,
    });
  }
});

// =======================
//  GET — FILTER / SORT / LIMIT
// =======================
router.get("/list", async (req, res) => {
  try {
    const { sport, league, venue, sort, limit } = req.query;
    const filter = {};
    if (sport) filter.sport = sport;
    if (league) filter.league = league;
    if (venue) filter.venue = venue;
    let query = Match.find(filter);
    if (sort === "asc") query = query.sort({ createdAt: 1 });
    if (sort === "desc") query = query.sort({ createdAt: -1 });

    if (limit && !isNaN(limit)) query = query.limit(Number(limit));
    const matches = await query;
    if (matches.length === 0) {
      return res.status(400).json({ error: "No match records found" });
    }
    return res.status(200).json({
      message: "Matches found",
      matches,
    });
  } catch (error) {
    console.error("Error finding matches:", error);
    return res.status(500).json({
      error: "Failed to fetch matches",
      details: error.message,
    });
  }
});

// =======================
//  DELETE — BY ID
// =======================
router.delete("/delete/:id", async (req, res) => {
  try {
    const matchId = req.params.id;
    if (!matchId) {
      return res.status(400).json({ error: "Match ID is required" });
    }
    const deletedMatch = await Match.findByIdAndDelete(matchId);
    if (!deletedMatch) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.status(200).json({
      message: "Match deleted successfully",
      match: deletedMatch,
    });
  } catch (error) {
    console.error("Delete match error:", error);
    res.status(500).json({
      error: "Failed to delete match",
      details: error.message,
    });
  }
});
module.exports = router;
