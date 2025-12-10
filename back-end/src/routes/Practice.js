// ============================================================================
//  CANDIDATE ROUTER — CRUD API (POST, GET, PATCH, DELETE)
// ============================================================================

import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// ============================================================================
//  POST — ADD NEW CANDIDATE
// ============================================================================
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      skills,
      experience,
      education,
      certification,
      college,
      status,
    } = req.body;

    // 🔍 Required fields validation
    if (
      !name ||
      !phone ||
      !address ||
      !skills ||
      !experience ||
      !education ||
      !college
    ) {
      return res
        .status(400)
        .json({ error: "All required fields must be provided" });
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return res
        .status(400)
        .json({ error: "Skills must be a non-empty array" });
    }

    const newCandidate = new Candidate({
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      skills,
      experience,
      education: education.trim(),
      certification: certification?.trim() || "",
      college: college.trim(),
      status: status || "ACTIVE",
    });

    const savedCandidate = await newCandidate.save();
    return res.status(201).json(savedCandidate);
  } catch (error) {
    console.error("Error creating candidate:", error);
    return res.status(500).json({
      error: "Failed to create candidate",
      details: error.message,
    });
  }
});

// ============================================================================
//  PATCH — UPDATE CANDIDATE
// ============================================================================
router.patch("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Valid candidate ID is required" });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    // 🔍 Prevent empty mandatory fields
    const requiredFields = [
      "name",
      "phone",
      "address",
      "skills",
      "experience",
      "education",
      "college",
    ];
    for (const field of requiredFields) {
      if (field in req.body && req.body[field] === "") {
        return res.status(400).json({ error: `${field} cannot be empty` });
      }
    }

    if (
      req.body.skills &&
      (!Array.isArray(req.body.skills) || req.body.skills.length === 0)
    ) {
      return res
        .status(400)
        .json({ error: "Skills must be a non-empty array" });
    }

    const updatedCandidate = await Candidate.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    return res.status(200).json({
      message: "Candidate updated successfully",
      updatedCandidate,
    });
  } catch (error) {
    console.error("Error updating candidate:", error);
    return res.status(500).json({
      error: "Failed to update candidate",
      details: error.message,
    });
  }
});

// ============================================================================
//  GET — FILTER / SEARCH / SORT / LIMIT CANDIDATES
// ============================================================================
router.get("/list", async (req, res) => {
  try {
    const { name, skills, status, sort, limit } = req.query;

    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (status) filter.status = status;

    if (skills) {
      const skillArray = skills.split(",");
      filter.skills = { $all: skillArray };
    }

    let query = Candidate.find(filter);

    if (sort === "asc") query = query.sort({ createdAt: 1 });
    if (sort === "desc") query = query.sort({ createdAt: -1 });

    if (limit && !isNaN(limit)) query = query.limit(Number(limit));

    const candidates = await query;

    if (candidates.length === 0) {
      return res.status(400).json({ error: "No candidates found" });
    }

    return res.status(200).json({
      message: "Candidates found",
      candidates,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    return res.status(500).json({
      error: "Failed to fetch candidates",
      details: error.message,
    });
  }
});

// ============================================================================
//  DELETE — REMOVE CANDIDATE
// ============================================================================
router.delete("/delete/:id", async (req, res) => {
  try {
    const candidateId = req.params.id;

    if (!candidateId || !mongoose.Types.ObjectId.isValid(candidateId)) {
      return res.status(400).json({ error: "Valid candidate ID is required" });
    }

    const deletedCandidate = await Candidate.findByIdAndDelete(candidateId);

    if (!deletedCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    return res.status(200).json({
      message: "Candidate deleted successfully",
      candidate: deletedCandidate,
    });
  } catch (error) {
    console.error("Delete candidate error:", error);
    return res.status(500).json({
      error: "Failed to delete candidate",
      details: error.message,
    });
  }
});

export default router;
