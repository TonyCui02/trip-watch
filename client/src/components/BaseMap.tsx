import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";

import { useState } from "react";
import Map, { NavigationControl, useControl } from "react-map-gl";
import { BusLayer } from "../layers/BusLayer";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

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
  busLocationsData?: [];
  trainLocationsData?: [];
  ferryLocationsData?: [];
}

export function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function BaseMap(props: BaseMapProps) {
  const [hoverInfo, setHoverInfo] = useState(INITIAL_INFO as any);
  const busLayer = BusLayer(props.busLocationsData, setHoverInfo);
  const layers = [busLayer];

  return (
    <div className="w-full h-screen">
      <Map
        mapStyle={MAP_STYLE}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        reuseMaps
        initialViewState={INITIAL_VIEW_STATE}
      >
        <DeckGLOverlay layers={layers} />
        <NavigationControl />
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
