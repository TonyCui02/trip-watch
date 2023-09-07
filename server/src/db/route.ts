import { IVehicleRoute } from "IRoute";
import mongoose, { Model } from "mongoose";

const Schema = mongoose.Schema;

const routeSchema = new Schema<IVehicleRoute>({
  routeId: { type: String, required: true, unique: true },
  agencyId: { type: String, required: true },
  routeShortName: { type: String, required: true },
  routeLongName: { type: String, required: true },
  routeDesc: { type: String },
  routeType: { type: Number, required: true },
  routeUrl: { type: String },
  routeColor: { type: String },
  routeTextColor: { type: String },
  routeSortOrder: { type: Number },
  contractId: { type: Number },
});

const Route: Model<IVehicleRoute> = mongoose.model("Route", routeSchema);

export default Route;
