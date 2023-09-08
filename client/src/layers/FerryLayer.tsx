import { IconLayer } from "@deck.gl/layers/typed";
import { RouteType } from "../types/RouteType";
import { VehicleFeedEntity } from "../types/VehicleFeedEntity";
import { FeedEntity } from "../types/gtfs-realtime";

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

const getFerryImage = (bearing?: number) => {

  if (bearing == undefined || bearing == null) {
    console.log("no bearing found");
    return FERRY_IMAGES[2]; // return default as fallback
  }
  const fixedBearing = bearing % 360; // need to fix bearing because of image rotation
  const index = Math.round(fixedBearing / 45) % FERRY_IMAGES.length;
  return FERRY_IMAGES[index];
};

const FerryLayer = (
  data: FeedEntity[] | undefined,
  setHoverInfo: (info: object) => void
) => {
  const layer = new IconLayer({
    id: "ferry",
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
      url: getFerryImage(d.vehicle?.position?.bearing),
      width: 64,
      height: 64,
      anchorY: 40,
    }),
    getSize: (d) => 5,
    sizeScale: 24,
  });

  return layer;
};

export default FerryLayer
