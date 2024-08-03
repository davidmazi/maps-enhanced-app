import InitialLocationMap from "@/components/Index/InitialLocationMap";
import React from "react";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function Index() {
  return (
    <View style={styles.container}>
      <InitialLocationMap />
    </View>
  );
}
