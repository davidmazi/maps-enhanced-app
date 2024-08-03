import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ColorValue,
  ActivityIndicatorProps,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

interface Props {
  size: ActivityIndicatorProps["size"];
  color?: ColorValue;
}

function Loader({ size, color = "#0000ff" }: Props): React.ReactElement {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

export default Loader;
