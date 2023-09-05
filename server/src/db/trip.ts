import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tripSchema = new Schema({
  routeId: { type: String, required: true },
  serviceId: { type: String, required: true },
  tripId: { type: String, required: true, unique: true },
  tripHeadsign: { type: String },
  tripShortName: { type: String },
  directionId: { type: Number },
  blockId: { type: String },
  shapeId: { type: String },
  wheelchairAccessible: { type: Number },
  bikesAllowed: { type: Number },
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;