import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Loader from "@/components/Loader";

import { useServerStatus } from "../ServerStatusContext";
import type { GlobalButtonProps } from "./GlobalButtons";

const styles = StyleSheet.create({
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: "absolute",
    top: -3,
    right: -3,
  },
});

export default function ServerStatus({ style }: GlobalButtonProps) {
  const { serverOnline, isChecking, checkServerStatus } = useServerStatus();

  const getStatusColor = () => (serverOnline ? "green" : "red");

  return (
    <TouchableOpacity style={style} onPress={checkServerStatus}>
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
  );
}
