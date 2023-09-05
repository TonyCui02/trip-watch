import { LineLayer } from "@deck.gl/layers/typed";

export const TripLayer = (
  data: any[] | undefined,
  setHoverInfo: (info: object) => void
) => {
  const layer = new LineLayer({
    id: "trip-layer",
    data,
    pickable: true,
    getWidth: 50,
    getSourcePosition: (d) => d.from.coordinates,
    getTargetPosition: (d) => d.to.coordinates,
    getColor: (d) => [Math.sqrt(d.inbound + d.outbound), 140, 0],
  });

  return layer;
};
