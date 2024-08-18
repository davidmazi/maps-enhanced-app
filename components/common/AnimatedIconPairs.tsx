import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "apple-colors";

interface AnimatedIconPairProps {
  filledIconName: keyof typeof Ionicons.glyphMap;
  outlineIconName: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});

function AnimatedIconPair({
  filledIconName,
  outlineIconName,
  size = 24,
  color = Colors.iOS.Light.Blue,
}: AnimatedIconPairProps) {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseAnim]);

  return (
    <View style={[styles.container, { height: size, width: size }]}>
      <Animated.View style={[styles.icon, { opacity: pulseAnim }]}>
        <Ionicons name={filledIconName} size={size} color={color} />
      </Animated.View>
      <Animated.View
        style={[
          styles.icon,
          {
            opacity: pulseAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
          },
        ]}
      >
        <Ionicons name={outlineIconName} size={size} color={color} />
      </Animated.View>
    </View>
  );
}

export default AnimatedIconPair;
