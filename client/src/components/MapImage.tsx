import { useMap } from "react-map-gl";

export default function MapImage() {
  const { current: map } = useMap();

  if (!map.hasImage("map-pin")) {
    map.loadImage("buses/1.png", (error, image) => {
      if (error) throw error;
      if (!map.hasImage("map-pin"))
        map.addImage("map-pin", image, { sdf: true });
    });
  }

  return null;
}
