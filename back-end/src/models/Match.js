const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema(
  {
    teamA: { type: String, required: true, trim: true },
    teamB: { type: String, required: true, trim: true },
    sport: { type: String, required: true, trim: true },
    league: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },

    matchDate: { type: Date, default: Date.now },
    scoreA: { type: Number, default: 0 },
    scoreB: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["upcoming", "live", "completed"],
      default: "upcoming",
    },

    winner: { type: String, default: "" },
    isArchived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", MatchSchema);
