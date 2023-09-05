import express from "express";
import Trip from "../../db/trip";

const router = express.Router();

router.get("/", async (req, res) => {
  // Get all trips
  const trips = await Trip.find({});

  res.json(trips);
});

export default router;
