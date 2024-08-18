import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "apple-colors";

interface StyledIconTextProps {
  text: string | number;
  iconName: keyof typeof Ionicons.glyphMap;
  iconSize?: number;
  iconColor?: string;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.iOS.Light.Grey6,
    borderRadius: 12,
    marginHorizontal: 5,
    padding: 4,
    shadowColor: Colors.iOS.Light.Red,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
  },
  text: {
    color: Colors.iOS.Light.Grey1,
    fontSize: 12,
    fontWeight: "600",
    paddingRight: 5,
  },
});

function StyledIconText({
  text,
  iconName,
  iconSize = 15,
  iconColor = Colors.iOS.Light.Orange,
}: StyledIconTextProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      <Ionicons name={iconName} size={iconSize} color={iconColor} />
    </View>
  );
}

export default StyledIconText;
