import { Dimensions } from "react-native";

const { fontScale, width, height, scale } = Dimensions.get("window");

const Metrics = {
  FONT_SCALE: fontScale,
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  SCALE: scale,
};

export default Metrics;
