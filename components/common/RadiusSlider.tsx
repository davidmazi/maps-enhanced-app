import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

import { Ionicons } from "@expo/vector-icons";
import Colors from "apple-colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.iOS.Light.Green,
    opacity: 0.8,
    borderRadius: 25,
    padding: 10,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderContainer: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 20,
    borderRadius: 25,
    backgroundColor: Colors.iOS.Light.Green,
    position: "absolute",
    right: 0,
    top: "150%",
    padding: 2,
  },
  slider: {
    width: 150,
  },
});

interface Props {
  maxRadius: number;
  setMaxRadius: React.Dispatch<React.SetStateAction<number>>;
}

function RadiusSlider({ maxRadius, setMaxRadius }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerStyle = {
    ...styles.container,
    borderBottomLeftRadius: isExpanded ? 0 : 25,
    borderBottomRightRadius: isExpanded ? 0 : 25,
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text>
          {maxRadius} m {isExpanded && <Ionicons size={10} name="chevron-up" />}
        </Text>
        {!isExpanded && <Ionicons size={10} name="chevron-down" />}
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.sliderContainer}>
          <Slider
            style={styles.slider}
            minimumValue={10}
            maximumValue={999}
            step={10}
            value={maxRadius}
            onValueChange={setMaxRadius}
            minimumTrackTintColor={Colors.iOS.Light.Blue}
            maximumTrackTintColor="#000000"
          />
        </View>
      )}
    </View>
  );
}

export default RadiusSlider;
