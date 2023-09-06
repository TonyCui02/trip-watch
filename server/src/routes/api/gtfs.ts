import express from "express";

import csv from "csvtojson";
import path from "path";
import Route from "../../db/route";
import Shape from "../../db/shape";
import Stop from "../../db/stop";
import StopTime from "../../db/stopTime";
import Trip from "../../db/trip";
import { parseAtTime } from "../../utils/time";

const router = express.Router();

// const gtfsFilepath = "../../gtfsAucklandTransport/";

// load all static gtfs data into the DB
// router.post("/", async (req, res) => {
//   const trips = await convertCsvToJson(gtfsFilepath + "trips.txt");
//   await uploadTrips(trips);
//   Logger.info("trips upload success!");

//   const stopTimes = await convertCsvToJson(gtfsFilepath + "stop_times.txt");
//   await uploadStopTimes(stopTimes);
//   Logger.info("stopTimes upload success!");

//   const routes = await convertCsvToJson(gtfsFilepath + "routes.txt");
//   await uploadRoutes(routes);
//   Logger.info("routes upload success!");

//   const shapes = await convertCsvToJson(gtfsFilepath + "shapes.txt");
//   fs.writeFileSync('shapes.json', JSON.stringify(shapes));
//   await uploadShapes(shapes);
//   Logger.info("shapes upload success!");

//   const stops = await convertCsvToJson(gtfsFilepath + "stops.txt");
//   await uploadStops(stops);
//   Logger.info("stops upload success!");

//   return res.json(shapes);
// });

async function convertCsvToJson(csvFilePath: string) {
  try {
    const jsonArray = await csv().fromFile(
      path.resolve(__dirname, csvFilePath),
      "utf-8"
    );
    return jsonArray;
  } catch (error) {
    return error.message;
  }
}

async function uploadTrips(tripsArray: any[]) {
  try {
    let trips = [];
    for (let trip of tripsArray) {
      // Create a new Trip instance with the JSON data
      const newTrip = new Trip({
        routeId: trip.route_id,
        serviceId: trip.service_id,
        tripId: trip.trip_id,
        tripHeadsign: trip.trip_headsign,
        tripShortName: trip.trip_short_name,
        directionId: parseInt(trip.direction_id),
        blockId: trip.block_id,
        shapeId: trip.shape_id,
        wheelchairAccessible: parseInt(trip.wheelchair_accessible),
        bikesAllowed: parseInt(trip.bikes_allowed),
      });
      trips.push(newTrip);
    }
    await Trip.insertMany(trips);
    return;
  } catch (error) {
    throw error;
  }
}

async function uploadStopTimes(stopTimesArray: any[]) {
  try {
    let stopTimes = [];

    for (let stopTime of stopTimesArray) {
      // Parse arrival and departure times to store as numbers (e.g., seconds since midnight)
      const arrivalTime = parseAtTime(stopTime.arrival_time);
      const departureTime = parseAtTime(stopTime.departure_time);

      const newStopTime = new StopTime({
        tripId: stopTime.trip_id,
        arrivalTime,
        departureTime,
        stopId: stopTime.stop_id,
        stopSequence: parseInt(stopTime.stop_sequence),
        stopHeadsign: stopTime.stop_headsign,
        pickupType: parseInt(stopTime.pickup_type),
        dropOffType: parseInt(stopTime.drop_off_type),
        shapeDistTraveled: parseFloat(stopTime.shape_dist_traveled),
        timepoint: parseInt(stopTime.timepoint),
      });
      stopTimes.push(newStopTime);
    }

    await StopTime.insertMany(stopTimes);
    return;
  } catch (error) {
    throw error;
  }
}

async function uploadStops(stopsArray: any[]) {
  try {
    let stops = [];

    for (let stop of stopsArray) {
      const newStop = new Stop({
        stopId: stop.stop_id,
        stopCode: stop.stop_code,
        stopName: stop.stop_name,
        stopDesc: stop.stop_desc,
        stopLat: parseFloat(stop.stop_lat),
        stopLon: parseFloat(stop.stop_lon),
        zoneId: stop.zone_id,
        stopUrl: stop.stop_url,
        locationType: parseInt(stop.location_type),
        parentStation: stop.parent_station,
        stopTimezone: stop.stop_timezone,
        platformCode: stop.platform_code,
        wheelchairBoarding: parseInt(stop.wheelchair_boarding),
        startDate: stop.start_date,
        endDate: stop.end_date,
      });

      stops.push(newStop);
    }

    await Stop.insertMany(stops);
    return;
  } catch (error) {
    throw error;
  }
}

async function uploadShapes(shapesArray: any[]) {
  try {
    let shapes = [];

    for (let shape of shapesArray) {
      const newShape = new Shape({
        shapeId: shape.shape_id,
        shapePtLat: parseFloat(shape.shape_pt_lat),
        shapePtLon: parseFloat(shape.shape_pt_lon),
        shapePtSequence: parseInt(shape.shape_pt_sequence),
        shapeDistTraveled: parseFloat(shape.shape_dist_traveled),
      });

      shapes.push(newShape);
    }

    await Shape.insertMany(shapes);
    return;
  } catch (error) {
    throw error;
  }
}

async function uploadRoutes(routesArray: any[]) {
  try {
    let routes = [];

    for (let route of routesArray) {
      const newRoute = new Route({
        routeId: route.route_id,
        agencyId: route.agency_id,
        routeShortName: route.route_short_name,
        routeLongName: route.route_long_name,
        routeDesc: route.route_desc || "", // Handle possible missing description
        routeType: parseInt(route.route_type),
        routeUrl: route.route_url || "", // Handle possible missing URL
        routeColor: route.route_color || "", // Handle possible missing color
        routeTextColor: route.route_text_color || "", // Handle possible missing text color
        routeSortOrder: parseInt(route.route_sort_order) || 0, // Default to 0 if missing
        contractId: parseInt(route.contract_id) || null, // Use null if missing
      });

      routes.push(newRoute);
    }

    await Route.insertMany(routes);
    return;
  } catch (error) {
    throw error;
  }
}

export default router;
