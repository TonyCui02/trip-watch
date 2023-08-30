import { MapboxOverlay, MapboxOverlayProps } from "@deck.gl/mapbox/typed";
import { ScenegraphLayer } from "@deck.gl/mesh-layers/typed";
import { Map, NavigationControl, useControl } from "react-map-gl";

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: 174.6280145,
  latitude: -36.9078338,
  zoom: 11,
  maxZoom: 20,
  pitch: 30,
  bearing: 0,
};

interface BaseMapProps {
  data?: [];
}

export function DeckGLOverlay(props: MapboxOverlayProps) {
  const overlay = useControl(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

export default function BaseMap(props: BaseMapProps) {
  const layers = [
    new ScenegraphLayer({
      id: "ScenegraphLayer",
      data: props.data,

      /* props from ScenegraphLayer class */

      // _animations: {
      //   "*": { speed: 5 },
      // },
      _lighting: "pbr",
      // getAnimator: null,
      // getColor: [255, 255, 255, 255],
      getOrientation: (d) => [0, Math.random() * 180, 90],
      getPosition: (d) => [d.position.longitude, d.position.latitude],
      // getScale: [1, 1, 1],
      // getScene: null,
      // getTransformMatrix: [],
      // getTranslation: [0, 0, 0],
      // loaders: ,
      scenegraph:
        "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb",
      // sizeMaxPixels: Number.MAX_SAFE_INTEGER,
      // sizeMinPixels: 0,
      sizeScale: 25,

      /* props inherited from Layer class */

      // autoHighlight: false,
      // coordinateOrigin: [0, 0, 0],
      // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
      // highlightColor: [0, 0, 128, 128],
      // modelMatrix: null,
      // opacity: 1,
      pickable: true,
      // visible: true,
      // wrapLongitude: false,
    }),
  ];
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
