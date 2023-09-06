import { IconLayer } from "@deck.gl/layers/typed";
import { VehiclePosition } from "../types/gtfs-realtime";

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

const FERRY_IMAGES = [
  "ferry/0.png",
  "ferry/1.png",
  "ferry/2.png",
  "ferry/3.png",
  "ferry/4.png",
  "ferry/5.png",
  "ferry/6.png",
  "ferry/7.png",
];

// determine which vehicle icon to get depending on orientation
const getVehicleImage = (data: VehiclePosition) => {
  if (data.position!.bearing == undefined) {
    console.log("no bearing found");
    return BUS_IMAGES[0]; // return default as fallback
  }
  const bearing = parseInt(bearingStr);
  const fixedBearing = (bearing + 20) % 360; // need to fix bearing because of image rotation
  const index = Math.floor(fixedBearing / 45) % BUS_IMAGES.length;
  return BUS_IMAGES[index];
};

export const VehicleLayer = (
  data: any[] | undefined,
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
      url: getBusImage(d!),
      width: 64,
      height: 64,
      anchorY: 40,
    }),
    getSize: (d) => 5,
    sizeScale: 12,
  });

  return layer;
};
