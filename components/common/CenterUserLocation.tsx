import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView from "react-native-maps";

import { useUserLocationContext } from "@/components/Index/UserLocationContext";

const styles = StyleSheet.create({
  centerButton: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginBottom: 10,
    borderRadius: 25,
  },
  iconContainer: {
    position: "relative",
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
  },
});

interface CenterUserLocationProps {
  mapRef: React.RefObject<MapView>;
  addOffset?: boolean;
}

export default function CenterUserLocation({
  mapRef,
  addOffset,
}: CenterUserLocationProps) {
  const { userLocation } = useUserLocationContext();
  const [pulseAnim] = useState(new Animated.Value(0));

  const centerToUserLocation = useCallback(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: userLocation.latitude - (addOffset ? 0.0009 : 0),
            longitude: userLocation.longitude,
          },
        },
        { duration: 1000 },
      );
    }
  }, [mapRef, userLocation, addOffset]);

  useEffect(() => {
    if (!userLocation) {
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
    } else {
      pulseAnim.setValue(0);
    }
  }, [userLocation, pulseAnim]);

  return (
    <TouchableOpacity
      style={styles.centerButton}
      onPress={centerToUserLocation}
    >
      <View style={styles.iconContainer}>
        {userLocation ? (
          <Ionicons name="locate" size={24} color="black" />
        ) : (
          <>
            <Animated.View style={[styles.icon, { opacity: pulseAnim }]}>
              <Ionicons
                name="navigate"
                size={24}
                color="rgba(0, 122, 255, 0.8)"
              />
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
              <Ionicons
                name="navigate-outline"
                size={24}
                color="rgba(0, 122, 255, 0.8)"
              />
            </Animated.View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}
