import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUserLocationContext } from "./UserLocationContext";
import MapButtons from "../common/MapButtons";
import CenterUserLocation from "../common/CenterUserLocation";
import CenteredMarker from "../common/CenteredMarker";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  validateButton: {
    position: "absolute",
    bottom: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: "rgba(0, 122, 255, 0.8)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginRight: 8,
  },
});

function InitialLocationMap() {
  const { userLocation } = useUserLocationContext();
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const [centerCoordinates, setCenterCoordinates] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
  });

  const navigateToMap = () => {
    router.push({
      pathname: "/map",
      params: {
        latitude: centerCoordinates.latitude,
        longitude: centerCoordinates.longitude,
      },
    });
  };

  const onRegionChangeComplete = (region: Region) => {
    setCenterCoordinates({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        showsUserLocation
        followsUserLocation
        showsMyLocationButton
        loadingEnabled
        onRegionChangeComplete={onRegionChangeComplete}
        camera={{
          center: {
            latitude: 48.8566,
            longitude: 2.3522, // Paris center default coordinates
          },
          heading: 2.1,
          pitch: 1,
          zoom: 1,
          altitude: 1500,
        }}
      />
      <CenteredMarker />
      <MapButtons variant="right">
        <CenterUserLocation userLocation={userLocation} mapRef={mapRef} />
      </MapButtons>
      <TouchableOpacity style={styles.validateButton} onPress={navigateToMap}>
        <Text style={styles.buttonText}>Search Near Pin</Text>
        <Ionicons name="arrow-forward-circle-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default InitialLocationMap;
