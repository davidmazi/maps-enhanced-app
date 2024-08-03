import React from "react";
import { ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  variant: "left" | "right";
  children: React.ReactNode;
}

function MapButtons({ variant, children }: Props): React.ReactElement {
  const containerStyle: ViewStyle = {
    position: "absolute",
    ...(variant === "right" ? { top: 60 } : { top: 10 }),
    flexDirection: "column",
    alignItems: "center",
    ...(variant === "left" ? { left: 10 } : { right: "1%" }),
  };

  return <SafeAreaView style={containerStyle}>{children}</SafeAreaView>;
}

export default MapButtons;
