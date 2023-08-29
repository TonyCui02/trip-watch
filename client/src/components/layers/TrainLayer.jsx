import { ScenegraphLayer } from "@deck.gl/mesh-layers";

export const TrainLayer = () =>
  new ScenegraphLayer({
    id: "ScenegraphLayer",
    data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json",

    /* props from ScenegraphLayer class */

    _animations: {
      "*": { speed: 5 },
    },
    _lighting: "pbr",
    // getAnimator: null,
    // getColor: [255, 255, 255, 255],
    getOrientation: (d) => [0, Math.random() * 180, 90],
    getPosition: (d) => d.coordinates,
    // getScale: [1, 1, 1],
    // getScene: null,
    // getTransformMatrix: [],
    // getTranslation: [0, 0, 0],
    // loaders: ,
    scenegraph:
      "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb",
    // sizeMaxPixels: Number.MAX_SAFE_INTEGER,
    // sizeMinPixels: 0,
    sizeScale: 500,

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
  });
