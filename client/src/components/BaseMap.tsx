import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Map, {
  GeolocateControl,
  NavigationControl,
  useControl,
} from "react-map-gl";
import { MapPageContext } from "../contexts/MapContextProvider";
import { VehicleLayer } from "../layers/VehicleLayer";
import { TripLayer } from "../layers/TripLayer";
import { Shape } from "../types/Shape";
import { Trip } from "../types/Trip";
import { GeoJSON } from "geojson";

const API_URL = import.meta.env.VITE_API_URL;

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const MAP_STYLE = "mapbox://styles/mapbox/streets-v12";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 174.6280145,
  latitude: -36.9078338,
  zoom: 11,
  maxZoom: 18,
  pitch: 0,
  bearing: 0,
  maxPitch: 60,
};

const INITIAL_INFO = {
  object: null,
};

interface BaseMapProps {
  vehicleUpdates?: any[] | null;
}

export function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function BaseMap(props: BaseMapProps) {
  const [hoverInfo, setHoverInfo] = useState(INITIAL_INFO as any);
  const [shapesData, setShapesData] = useState<GeoJSON | null>(null);
  const { selectedRoutes } = useContext(MapPageContext);

  const vehicleLayer = VehicleLayer(props.vehicleUpdates!, setHoverInfo);
  const tripLayer = TripLayer(shapesData!, setHoverInfo);
  const layers = [tripLayer, vehicleLayer];

  console.log(selectedRoutes)

  const createShapesGeojson = (shapes: Shape[], shapeIds: string[]) => {
    let geojson: GeoJSON = {
      type: "FeatureCollection",
      features: [],
    };

    for (const shapeId of shapeIds) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const feature: any = {
        type: "Feature",
        properties: {
          name: shapeId,
          color: "#00aeef",
        },
        geometry: {
          type: "MultiLineString",
          coordinates: [[]],
        },
      };

      for (const shape of shapes) {
        if (shape["shapeId"] == feature["properties"]["name"]) {
          feature["geometry"]["coordinates"][0].push([
            shape["shapePtLon"],
            shape["shapePtLat"],
          ]);
        }
      }
      geojson.features.push(feature);
    }

    return geojson;
  };

  useEffect(() => {
    const fetchShapesForTrips = async () => {
      try {
        if (selectedRoutes === null || selectedRoutes.length === 0) {
          setShapesData(null);
          return; // only fetch shapes if user has filters
        }

        const tripIds = new Set(
          props.vehicleUpdates?.map(
            (vehiclePosition) => vehiclePosition.trip.trip_id
          )
        );

        const tripsRes = await axios.get(
          `${API_URL}/api/trips/${Array.from(tripIds).join(",")}`
        );
        const trips = tripsRes.data;
        const shapeIds = trips.map((trip: Trip) => trip.shapeId);

        const shapesRes = await axios.get(
          `${API_URL}/api/shapes/${Array.from(shapeIds).join(",")}`
        );

        const shapes = shapesRes.data;
        const shapesGeojson = createShapesGeojson(shapes, shapeIds);
        setShapesData(shapesGeojson);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShapesForTrips();
  }, [props.vehicleUpdates, selectedRoutes]);

  return (
    <div className="w-full h-screen">
      <Map
        mapStyle={MAP_STYLE}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        reuseMaps
        initialViewState={INITIAL_VIEW_STATE}
      >
        <DeckGLOverlay layers={layers} />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="bottom-right"
          showUserLocation={true}
          showAccuracyCircle={false}
          positionOptions={{ enableHighAccuracy: true }}
        />
        {hoverInfo && (
          <div
            style={{
              position: "absolute",
              zIndex: 100,
              pointerEvents: "none",
              left: hoverInfo.x,
              top: hoverInfo.y,
            }}
          >
            {hoverInfo?.object?.trip?.route_id}
          </div>
        )}
      </Map>
    </div>
  );
}
