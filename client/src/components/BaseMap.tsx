import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";

import { Map, NavigationControl, useControl } from "react-map-gl";
import { BusLayer } from "../deckgl/layers/BusLayer";

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
  const busLayer = BusLayer(props.busLocationsData);
  const layers = [busLayer];
  return (
    <div className="w-full h-screen">
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={MAP_STYLE}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        style={{ width: "100vw", height: "100%" }}
        reuseMaps
      >
        <DeckGLOverlay layers={layers} />
        <NavigationControl />
      </Map>
    </div>
  );
}
