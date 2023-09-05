import express from "express";
import Shape from "../../db/shape";

const router = express.Router();

router.get("/:shapeIds", async (req, res) => {
  const shapeIds = req.params.shapeIds.split(",");

  // Create a query filter
  const query = { shapeId: { $in: shapeIds } };

  // Get the trips
  const trips = await Shape.find(query, { _id: 0 });

  res.json(trips);
});

export default router;
