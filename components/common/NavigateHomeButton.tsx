import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface NavigateHomeButtonProps {
  style?: object;
}

function NavigateHomeButton({ style }: NavigateHomeButtonProps) {
  const router = useRouter();

  const navigateHome = () => {
    router.back();
  };

  return (
    <TouchableOpacity style={style} onPress={navigateHome}>
      <Ionicons name="home-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}

export default NavigateHomeButton;
