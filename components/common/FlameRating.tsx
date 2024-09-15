import React from "react";
import { View, StyleSheet } from "react-native";

import Colors from "apple-colors";

import StyledIconText from "./StyledIconText";
import RepeatingIcon from "./RepeatingIcon";

interface FlameRatingProps {
  rating: number;
  totalRatings: number | null;
  size?: number;
  colors?: {
    active: string;
    inactive: string;
  };
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
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
  totalRatings,
  size = 24,
  colors = {
    active: Colors.iOS.Light.Orange,
    inactive: Colors.iOS.Light.Grey3,
  },
}: FlameRatingProps) {
  return (
    <View style={styles.container}>
      <RepeatingIcon
        count={5}
        value={rating}
        size={size}
        colors={colors}
        icons={{
          active: "flame",
          inactive: "flame-outline",
        }}
      />
      {totalRatings !== null && (
        <StyledIconText
          text={totalRatings}
          iconName="chatbubble-ellipses-outline"
          iconColor={colors.active}
        />
      )}
    </View>
  );
}

export default FlameRating;
