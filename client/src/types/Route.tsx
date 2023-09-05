export interface Route {
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

export enum RouteType {
  TRAIN = 2,
  BUS = 3,
  FERRY = 4,
}