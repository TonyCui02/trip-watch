import { LineLayer, GeoJsonLayer } from "@deck.gl/layers/typed";

export const TripLayer = (
  data: any[] | undefined,
  setHoverInfo: (info: object) => void
) => {
  const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data,
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    pointType: 'circle',
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    getPointRadius: 100,
    getLineWidth: 1,
    getElevation: 30
  });

  return layer;
};
