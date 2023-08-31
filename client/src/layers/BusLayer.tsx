import { IconLayer } from "@deck.gl/layers/typed";

const BUS_IMAGES = [
  "buses/0.png",
  "buses/1.png",
  "buses/2.png",
  "buses/3.png",
  "buses/4.png",
  "buses/5.png",
  "buses/6.png",
  "buses/7.png",
];

// determine which bus icon to get depending on orientation
const getBusImage = (bearingStr: string) => {
  if (bearingStr == undefined || bearingStr == null) {
    console.log("no bearing found");
    return BUS_IMAGES[0]; // return default as fallback
  }
  const bearing = parseInt(bearingStr);
  const fixedBearing = (bearing + 20) % 360; // need to fix bearing because of image rotation
  const index = Math.floor(fixedBearing / 45) % BUS_IMAGES.length;
  return BUS_IMAGES[index];
};

export const BusLayer = (
  data: [] | undefined,
  setHoverInfo: (info: object) => void
) => {
  const layer = new IconLayer({
    id: "buses",
    data: data,
    getPosition: (d) => [d.position.longitude, d.position.latitude],
    pickable: true,
    onHover: (info) => setHoverInfo(info),
    onClick: (info) => setHoverInfo(info),
    getColor: (d) => [Math.sqrt(d.exits), 140, 0],
    getIcon: (d) => ({
      url: getBusImage(d?.position?.bearing),
      width: 64,
      height: 64,
      anchorY: 28,
    }),
    getSize: (d) => 5,
    sizeScale: 8,
  });

  return layer;
};
