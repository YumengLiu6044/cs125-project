import { useWindowDimensions, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function useDeviceContext() {
  const { width, height, scale, fontScale } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const isPortrait = height >= width;
  const isLandscape = width > height;

  const isIOS = Platform.OS === "ios";
  const isAndroid = Platform.OS === "android";
  const isWeb = Platform.OS === "web";

  const isTablet = Math.min(width, height) >= 768;

  return {
    // dimensions
    width,
    height,
    scale,
    fontScale,

    // orientation
    isPortrait,
    isLandscape,

    // platform
    platform: Platform.OS,
    isIOS,
    isAndroid,
    isWeb,

    // device type
    isTablet,

    // safe area
    insets,
  };
}
