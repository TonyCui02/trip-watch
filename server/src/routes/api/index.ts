import express from "express";

const router = express.Router();

import vehicleRoutes from "./vehicles";
router.use("/vehicles", vehicleRoutes);

import gtfsRoutes from "./gtfs";
router.use("/gtfs", gtfsRoutes);

import routeRoutes from "./routes";
router.use("/routes", routeRoutes);

export default router;
