import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stopTimeSchema = new Schema({
  tripId: { type: String, required: true },
  arrivalTime: { type: Number, required: true },
  departureTime: { type: Number, required: true },
  stopId: { type: String, required: true },
  stopSequence: { type: Number, required: true },
  stopHeadsign: { type: String },
  pickupType: { type: Number },
  dropOffType: { type: Number },
  shapeDistTraveled: { type: Number },
  timepoint: { type: Boolean },
});

const StopTime = mongoose.model("StopTime", stopTimeSchema);

export default StopTime;