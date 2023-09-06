export interface Trip {
  routeId: string;
  serviceId: string;
  tripId: string;
  tripHeadsign: string;
  tripShortName: string;
  directionId: number;
  blockId: string;
  shapeId: string;
  wheelchairAccessible: number;
  bikesAllowed: number;
}
