import express from "express";

const router = express.Router();

import vehicleRoutes from "./vehicles";
router.use("/vehicles", vehicleRoutes);

export default router;
