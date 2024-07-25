import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  Animated,
  Easing,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";

interface RefreshButtonProps {
  onPress: () => void;
  isSpinning: boolean;
  styles: {
    floatingButton: StyleProp<ViewStyle>;
    disabledButton: StyleProp<ViewStyle>;
  };
}

function RefreshButton({ onPress, isSpinning, styles }: RefreshButtonProps) {
  const spinValue = useMemo(() => new Animated.Value(0), []);

  React.useEffect(() => {
    if (isSpinning) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      spinValue.setValue(0);
      spinValue.stopAnimation();
    }
  }, [isSpinning, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <TouchableOpacity
      style={[styles.floatingButton, isSpinning && styles.disabledButton]}
      onPress={onPress}
      disabled={isSpinning}
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Ionicons name="reload" size={24} color="black" />
      </Animated.View>
    </TouchableOpacity>
  );
}

export default RefreshButton;
