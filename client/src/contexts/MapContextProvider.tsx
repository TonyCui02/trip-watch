import { createContext } from "react";
import { Route } from "../types/Route";

export interface IMapPageContext {
  vehicleUpdates: any[] | null;
  routes: Route[] | null;
  selectedRoutes: Route[] | null;
}

export const MapPageContext = createContext<IMapPageContext>({
  vehicleUpdates: null,
  routes: null,
  selectedRoutes: null,
});
