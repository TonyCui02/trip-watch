import { ScenegraphLayer } from "@deck.gl/mesh-layers/typed";

export const BusLayer = (data: [] | undefined) => {
  const layer = new ScenegraphLayer({
    id: "ScenegraphLayer",
    data: data,
    _lighting: "flat",
    getOrientation: (d) => [0, Math.random() * 180, 90],
    getPosition: (d) => [d.position.longitude, d.position.latitude],
    scenegraph: "bus.glb",
    sizeScale: 0.05,
    pickable: true,
  });

  return layer;
};
