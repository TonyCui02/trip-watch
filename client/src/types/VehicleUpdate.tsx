import { IVehicleRoute } from "./IVehicleRoute";
import { Trip } from "./Trip";
import {
  Position,
  VehicleDescriptor,
  VehiclePosition$OccupancyStatus,
} from "./gtfs-realtime";

export interface VehicleUpdate {
  vehicleId: string;
  occupancyStatus?: VehiclePosition$OccupancyStatus;
  position?: Position;
  timestamp?: number;
  trip?: Trip;
  vehicle?: VehicleDescriptor;
  nextStop: string;
  actualArrivalTime: number;
  scheduledArrivalTime: number;
  route: IVehicleRoute;
}
