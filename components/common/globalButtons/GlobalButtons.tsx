import React from "react";
import { StyleProp, StyleSheet, ViewStyle, Text } from "react-native";

import { usePathname } from "expo-router";
import Colors from "apple-colors";
import NavigateHomeButton from "./NavigateHomeButton";
import ServerStatus from "./ServerStatus";
import MapButtons from "../MapButtons";

export interface GlobalButtonProps {
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    backgroundColor: Colors.iOS.Light.Grey6,
    opacity: 0.9,
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
  },
});

function GlobalButtons() {
  const pathName = usePathname();

  return (
    <MapButtons variant="left">
      <ServerStatus style={styles.button} />
      <NavigateHomeButton style={styles.button} disabled={pathName === "/"} />
    </MapButtons>
  );
}

export default GlobalButtons;
