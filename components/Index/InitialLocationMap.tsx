import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useRouter } from "expo-router";
import { useUserLocationContext } from "./UserLocationContext";
import MapButtons from "../common/MapButtons";
import CenterUserLocation from "../common/CenterUserLocation";
import CenteredMarker from "../common/CenteredMarker";
import SearchNearPinButton from "../navigation/SearchNearPinButton";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
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
      <SearchNearPinButton onPress={navigateToMap} />
    </View>
  );
}

export default InitialLocationMap;
