import express from "express";
import Trip from "../../db/trip";

const router = express.Router();

// Get trips given a list of tripIds
router.get("/:tripIds", async (req, res) => {
  const tripIds = req.params.tripIds.split(",");

  const trips = await Trip.find({ tripId: { $in: tripIds } });

  res.json(trips);
});

export default router;
