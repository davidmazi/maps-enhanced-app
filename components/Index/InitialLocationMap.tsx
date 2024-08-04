import React, { useEffect, useRef, useState } from "react";
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
  const [isInitialLocationSet, setIsInitialLocationSet] = useState(false);
  const { userLocation } = useUserLocationContext();
  const router = useRouter();
  const mapRef = useRef<MapView>(null);
  const [centerCoordinates, setCenterCoordinates] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
  });

  const navigateToMap = () => {
    router.navigate({
      pathname: "/map",
      params: {
        latitude: centerCoordinates.latitude,
        longitude: centerCoordinates.longitude,
      },
    });
  };

  useEffect(() => {
    if (userLocation && !isInitialLocationSet) {
      const center = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      };
      mapRef.current?.animateCamera({
        center,
      });
      setCenterCoordinates(center);
      setIsInitialLocationSet(true);
    }
  }, [userLocation, isInitialLocationSet]);

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
        loadingEnabled
        onRegionChangeComplete={onRegionChangeComplete}
        initialCamera={{
          center: centerCoordinates,
          heading: 2.1,
          pitch: 1,
          zoom: 1,
          altitude: 1500,
        }}
      />
      <CenteredMarker />
      <MapButtons variant="right">
        <CenterUserLocation mapRef={mapRef} />
      </MapButtons>
      <SearchNearPinButton onPress={navigateToMap} />
    </View>
  );
}

export default InitialLocationMap;
