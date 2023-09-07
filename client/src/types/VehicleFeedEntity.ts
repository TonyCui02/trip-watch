import { IVehicleRoute } from "./IVehicleRoute";
import { Alert, TripUpdate, VehiclePosition } from "./gtfs-realtime";

export interface VehicleFeedEntity {
  alert?: Alert;
  id: string;
  is_deleted?: boolean;
  trip_update?: TripUpdate;
  vehicle?: VehiclePosition;
  route?: IVehicleRoute;
}
