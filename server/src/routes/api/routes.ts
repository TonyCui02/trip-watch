import express from "express";
import Route from "../../db/route";

const router = express.Router();

router.get("/", async (req, res) => {
  const routes = await Route.find({});
  return res.json(routes);
});

export default router;
