import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { GlobalButtonProps } from "./GlobalButtons";

type Props = GlobalButtonProps & {
  disabled?: boolean;
};

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.5,
  },
});

function NavigateHomeButton({ style, disabled }: Props) {
  const router = useRouter();

  const navigateHome = () => {
    if (!disabled) {
      router.navigate({ pathname: "/" });
    }
  };

  return (
    <TouchableOpacity
      style={[style, disabled && styles.disabledButton]}
      onPress={navigateHome}
      disabled={disabled}
    >
      <Ionicons
        name="home-outline"
        size={24}
        color={disabled ? "#A0A0A0" : "black"}
      />
    </TouchableOpacity>
  );
}

export default NavigateHomeButton;
