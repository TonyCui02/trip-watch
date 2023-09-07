import { IconLayer } from "@deck.gl/layers/typed";
import { RouteType } from "../types/RouteType";
import { VehicleFeedEntity } from "../types/VehicleFeedEntity";
import { FeedEntity } from "../types/gtfs-realtime";

const anglesToIdx = {
  0: 0,
  45: 1,
  90: 2,
  135: 3,
  180: 4,
  225: 5,
  270: 6,
  315: 7,
};

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

// determine which bus icon to get depending on orientation
const getBusImage = (routeType?: number, bearing?: number) => {
  let image_arr = [];
  switch (routeType) {
    case RouteType.BUS:
      image_arr = BUS_IMAGES;
      break;
    case RouteType.FERRY:
      image_arr = FERRY_IMAGES;
      break;
    default:
      image_arr = BUS_IMAGES;
      break;
  }

  if (bearing == undefined || bearing == null) {
    console.log("no bearing found");
    return image_arr[2]; // return default as fallback
  }
  const fixedBearing = bearing % 360; // need to fix bearing because of image rotation
  const index = Math.round(fixedBearing / 45) % image_arr.length;
  return image_arr[index];
};

export const VehicleLayer = (
  data: FeedEntity[] | undefined,
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
    // getColor: (d) => [Math.sqrt(d.exits), 140, 0],
    getIcon: (d: VehicleFeedEntity) => ({
      url: getBusImage(d?.route?.routeType, d.vehicle?.position?.bearing),
      width: 64,
      height: 64,
      anchorY: 40,
    }),
    getSize: (d) => 5,
    sizeScale: 12,
  });

  return layer;
};
