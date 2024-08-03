import React from "react";
import { StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useServerStatus } from "../common/ServerStatusContext";

interface SearchNearPinButtonProps {
  onPress: () => void;
}

const styles = StyleSheet.create({
  validateButton: {
    position: "absolute",
    bottom: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: "rgb(0, 122, 255)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginRight: 8,
  },
});

function SearchNearPinButton({ onPress }: SearchNearPinButtonProps) {
  const { checkServerStatus } = useServerStatus();
  const { serverOnline } = useServerStatus();

  const handlePress = () => {
    if (serverOnline) {
      onPress();
    } else {
      checkServerStatus();
      Alert.alert(
        "Server Offline",
        "The server is currently offline. Please try again later.",
        [{ text: "OK" }],
      );
    }
  };

  return (
    <TouchableOpacity
      style={[styles.validateButton, !serverOnline && styles.disabledButton]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>Search Near Pin</Text>
      <Ionicons name="arrow-forward-circle-outline" size={24} color="white" />
    </TouchableOpacity>
  );
}

export default SearchNearPinButton;
