export interface IVehicleRoute {
  routeId: string;
  agencyId: string;
  routeShortName: string;
  routeLongName: string;
  routeDesc?: string;
  routeType: number;
  routeUrl?: string;
  routeColor?: string;
  routeTextColor?: string;
  routeSortOrder?: number;
  contractId?: number;
}
