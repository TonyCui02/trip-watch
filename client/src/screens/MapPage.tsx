import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import BaseMap from "../components/BaseMap";
import Search from "../components/Search";
import { MapPageContext } from "../contexts/MapContextProvider";
import { Route } from "../types/Route";
import { FeedEntity } from "../types/gtfs-realtime";

const API_URL = import.meta.env.VITE_API_URL;

const socket = io(API_URL);

export default function MapPage() {
  const [vehicleUpdates, setVehicleUpdates] = useState<FeedEntity[]>([]);
  const [routes, setRoutes] = useState<Route[] | null>(null);
  const [selectedRoutes, _setSelectedRoutes] = useState<Route[] | null>([]);

  const selectedRoutesRef = useRef(selectedRoutes);

  const setSelectedRoutes = (data: Route[] | null) => {
    selectedRoutesRef.current = data;
    _setSelectedRoutes(data);
  };

  // subscribe to vehicle updates room on component mount
  useEffect(() => {
    socket.emit("joinRoom", "vehiclePositions");
  }, []);

  // update data state whenever we get response from websocket
  useEffect(() => {
    socket.on("vehicleUpdates", (data) => {
      setVehicleUpdates(data);
    });
  }, [socket]);

  // fetch vehicle data on component load if we didn't get latest update
  useEffect(() => {
    async function fetchLatestVehicles() {
      try {
        const response = await axios.get(`${API_URL}/api/vehicles`);
        setVehicleUpdates(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (vehicleUpdates == null) {
      fetchLatestVehicles();
    }
  }, []);

  // fetch route info
  useEffect(() => {
    async function fetchRoutes() {
      try {
        const response = await axios.get(`${API_URL}/api/routes`);
        setRoutes(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRoutes();
  }, []);

  const filter = (updates: FeedEntity[] | null) => {
    if (selectedRoutes?.length == 0) {
      return updates;
    }

    const filteredVehicleUpdates = updates?.filter(
      (update) =>
        selectedRoutesRef.current?.find(
          (route) => route.routeId == update?.trip_update?.trip?.route_id
        ) != undefined
    );

    return filteredVehicleUpdates;
  };

  return (
    <MapPageContext.Provider
      value={{
        vehicleUpdates: vehicleUpdates,
        routes: routes,
        selectedRoutes: selectedRoutes,
      }}
    >
      <div className="w-screen h-screen">
        {/* <Collapsible>
          <div className="flex flex-col items-center mb-2">
            <button className="bg-purple-200 hover:bg-purple-300 text-neutral-800 font-bold py-2 px-4 rounded mr-2 text-sm">
              Send Message
            </button>
          </div>
        </Collapsible> */}
        <Search routes={routes!} setSelectedRoutes={setSelectedRoutes} />
        <BaseMap vehicleUpdates={filter(vehicleUpdates)!} />
      </div>
    </MapPageContext.Provider>
  );
}
