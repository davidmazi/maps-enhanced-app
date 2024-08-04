import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface FlameRatingProps {
  rating: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  flameContainer: {
    width: 24,
    height: 24,
    marginRight: 2,
  },
});

function FlameRating({
  rating,
  size = 24,
  activeColor = "#FF6B00",
  inactiveColor = "#A0A0A0",
}: FlameRatingProps) {
  // Ensure rating is between 0 and 5
  const safeRating = Math.max(0, Math.min(5, rating));

  const renderFlame = (index: number) => {
    const filled = Math.min(Math.max(safeRating - index + 1, 0), 1);

    return (
      <View key={index} style={styles.flameContainer}>
        <Ionicons
          name="flame-outline"
          size={size}
          color={inactiveColor}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={{ overflow: "hidden", width: `${filled * 100}%` }}>
          <Ionicons name="flame" size={size} color={activeColor} />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>{[1, 2, 3, 4, 5].map(renderFlame)}</View>
  );
}

export default FlameRating;
