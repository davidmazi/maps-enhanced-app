import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Loader from "@/components/Loader";
import MapButtons from "./MapButtons";
import { useServerStatus } from "./ServerStatusContext";

// Styles
const styles = StyleSheet.create({
  serverStatusButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 25,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: "absolute",
    top: 0,
    right: 0,
  },
});

// ServerStatus Component
export default function ServerStatus() {
  const { serverOnline, isChecking, checkServerStatus } = useServerStatus();

  const getStatusColor = () => (serverOnline ? "green" : "red");

  return (
    <MapButtons variant="left">
      <TouchableOpacity
        style={[styles.serverStatusButton]}
        onPress={checkServerStatus}
      >
        {isChecking ? (
          <Loader size="small" color="darkgrey" />
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="server-outline" size={24} color="black" />
            <View
              style={[styles.statusDot, { backgroundColor: getStatusColor() }]}
            />
          </View>
        )}
      </TouchableOpacity>
    </MapButtons>
  );
}
