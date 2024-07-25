import React from "react";
import { StyleSheet, View } from "react-native";

import MapComponent from "@/components/Map/MapComponent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <MapComponent />
    </View>
  );
}