import { IconLayer } from "@deck.gl/layers/typed";
import { RouteType } from "../types/RouteType";
import { VehicleFeedEntity } from "../types/VehicleFeedEntity";
import { FeedEntity } from "../types/gtfs-realtime";

const TRAIN_IMAGES = [
  "train/0.png",
  "train/1.png",
  "train/2.png",
  "train/3.png",
  "train/4.png",
  "train/5.png",
  "train/6.png",
  "train/7.png",
];

const getTrainImage = (bearing?: number) => {
  if (bearing == undefined || bearing == null) {
    console.log("no bearing found");
    return TRAIN_IMAGES[2]; // return default as fallback
  }
  const fixedBearing = bearing % 360; // need to fix bearing because of image rotation
  const index = Math.round(fixedBearing / 45) % TRAIN_IMAGES.length;
  return TRAIN_IMAGES[index];
};

const TrainLayer = (
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
      url: getTrainImage(d.vehicle?.position?.bearing),
      width: 200,
      height: 200,
      anchorY: 40,
    }),
    getSize: (d) => 96,
    sizeScale: 1,
  });

  return layer;
};

export default TrainLayer
