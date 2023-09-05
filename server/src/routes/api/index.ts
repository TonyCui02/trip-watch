import express from "express";

const router = express.Router();

import vehicleRoutes from "./vehicles";
router.use("/vehicles", vehicleRoutes);

import gtfsRoutes from "./gtfs";
router.use("/gtfs", gtfsRoutes);

import routeRoutes from "./routes";
router.use("/routes", routeRoutes);

import tripRoutes from "./trips";
router.use("/trips", tripRoutes);

import shapeRoutes from "./shapes";
router.use("/shapes", shapeRoutes);

export default router;
