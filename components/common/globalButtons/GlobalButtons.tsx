import React from "react";
import { StyleProp, StyleSheet, ViewStyle, Text } from "react-native";

import { usePathname } from "expo-router";
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
  },
});

function GlobalButtons() {
  const pathName = usePathname();

  return (
    <MapButtons variant="left">
      <Text>{pathName}</Text>
      <ServerStatus style={styles.button} />
      <NavigateHomeButton style={styles.button} disabled={pathName === "/"} />
    </MapButtons>
  );
}

export default GlobalButtons;
