import { createContext } from "react";
import { Route } from "../types/Route";

export interface IMapPageContext {
  vehicleUpdates: any[] | null;
  routes: Route[] | null;
}

export const MapPageContext = createContext<IMapPageContext | null>(null);
