import React from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  markerContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: "rgba(0, 122, 255, 0.8)",
    borderWidth: 7,
    backgroundColor: "white",
  },
});

function CenteredMarker() {
  return (
    <View style={styles.markerContainer}>
      <View style={styles.marker} />
    </View>
  );
}

export default CenteredMarker;
