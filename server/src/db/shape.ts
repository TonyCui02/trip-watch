import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shapeSchema = new Schema({
  shapeId: { type: String, required: true },
  shapePtLat: { type: Number, required: true },
  shapePtLon: { type: Number, required: true },
  shapePtSequence: { type: Number, required: true },
  shapeDistTraveled: { type: Number, required: true },
});

const Shape = mongoose.model("Shape", shapeSchema);

export default Shape;