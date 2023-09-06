import { GeoJsonLayer } from "@deck.gl/layers/typed";
import { GeoJSON } from "geojson";

export const TripLayer = (
  data: GeoJSON,
  setHoverInfo: (info: object) => void
) => {
  console.log(data);
  const layer = new GeoJsonLayer({
    id: "geojson-layer",
    data,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    getLineColor: (f) => {
      const hex = f.properties!.color;
      // convert to RGB
      return hex
        ? hex.match(/[0-9a-f]{2}/g).map((x) => parseInt(x, 16))
        : [0, 0, 0];
    },
    getFillColor: [160, 160, 180, 200],
    getLineWidth: 5,
    getPointRadius: 4,
    // getText: ( : any) => f.properties.name,
    getElevation: 30,
    pointRadiusUnits: "pixels",
    pointType: "circle+text",
    lineWidthMinPixels: 2,
  });

  return layer;
};
