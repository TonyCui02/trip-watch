import express from "express";
import Route from "../../db/route";
import Trip from "../../db/trip";

const router = express.Router();

router.get("/", async (req, res) => {
  const routes = await Route.find({});
  return res.json(routes);
});

// get single route id
router.get("/:id", async (req, res) => {
  const routeId = req.params.id;

  const route = await Route.find({routeId: routeId});
  return res.json(route);
});

router.get("/:routeIds/trips", async (req, res) => {
  const routeIds = req.params.routeIds.split(",");

  // Create a query filter
  const query = { routeId: { $in: routeIds } };

  // Get the trips
  const trips = await Trip.find(query, { _id: 0 });

  res.json(trips);
});

export default router;
