import { IconLayer } from "@deck.gl/layers/typed";
import { VehicleFeedEntity } from "../types/VehicleFeedEntity";
import { FeedEntity } from "../types/gtfs-realtime";

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
const getBusImage = (bearing?: number) => {
  if (bearing == undefined || bearing == null) {
    console.log("no bearing found");
    return BUS_IMAGES[2]; // return default as fallback
  }
  const fixedBearing = bearing % 360; // need to fix bearing because of image rotation
  const index = Math.round(fixedBearing / 45) % BUS_IMAGES.length;
  return BUS_IMAGES[index];
};

const BusLayer = (
  data: VehicleFeedEntity[] | undefined,
  setHoverInfo: (info: object) => void
) => {
  const layer = new IconLayer({
    id: "buses",
    data: data,
    getPosition: (d: FeedEntity) => [
      d!.vehicle!.position!.longitude,
      d.vehicle!.position!.latitude,
    ],
    pickable: true,
    onHover: (info) => setHoverInfo(info),
    onClick: (info) => setHoverInfo(info),
    getIcon: (d: VehicleFeedEntity) => ({
      url: getBusImage(d.vehicle?.position?.bearing),
      width: 64,
      height: 64,
      anchorY: 40,
    }),
    getSize: (d) => 5,
    sizeScale: 12,
  });

  return layer;
};

export default BusLayer;
