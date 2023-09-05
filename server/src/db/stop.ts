import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stopSchema = new Schema({
  stopId: { type: String, required: true, unique: true },
  stopCode: { type: String },
  stopName: { type: String },
  stopDesc: { type: String },
  stopLat: { type: Number },
  stopLon: { type: Number },
  zoneId: { type: String },
  stopUrl: { type: String },
  locationType: { type: Number },
  parentStation: { type: String },
  stopTimezone: { type: String },
  platformCode: { type: String },
  wheelchairBoarding: { type: Number },
  startDate: { type: String },
  endDate: { type: String },
});

const Stop = mongoose.model("Stop", stopSchema);

export default Stop;