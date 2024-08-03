import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

import Loader from "@/components/Loader";
import MapButtons from "./MapButtons";

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
  const [serverOnline, setServerOnline] = useState<boolean>();
  const [isChecking, setIsChecking] = useState(false);

  const checkServerStatus = useCallback(async () => {
    setIsChecking(true);
    try {
      await axios.get("https://maps-enhanced-api.onrender.com", {
        timeout: 10000,
      });
      setServerOnline(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_BAD_REQUEST") setServerOnline(true);
        else setServerOnline(false);
      }
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkServerStatus();
  }, [checkServerStatus]);

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
