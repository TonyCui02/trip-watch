import express from "express";
import cache from "../../store/cache";

const router = express.Router();

// get most recent vehicle location data from cache
router.get("/", async (req, res) => {
  const vehiclesList = cache.get("vehiclePositions");
  if (!vehiclesList) return res.sendStatus(404);
  return res.json(vehiclesList);
});

export default router;
