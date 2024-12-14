import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { useRouter } from "expo-router";

import { getRandomNearbyPosition, validatePosition } from "@utils/mapPositions";
import RadiusSlider from "@components/common/RadiusSlider";
import { useUserLocationContext } from "./UserLocationContext";
import MapButtons from "../common/MapButtons";
import CenterUserLocation from "../common/CenterUserLocation";
import CenteredMarker from "../common/CenteredMarker";
import SearchNearPinButton from "../navigation/SearchNearPinButton";
import LocationSearchBar from "../LocationSearchBar";

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
    latitude: 48.88649669078083,
    longitude: 2.3165155142453204,
  });
  const [maxRadius, setMaxRadius] = useState(10); // Max radius in meters

  const navigateToMap = async () => {
    const camera = await mapRef.current?.getCamera();

    if (camera?.center) {
      const randomPosition = getRandomNearbyPosition(
        {
          latitude: camera.center.latitude,
          longitude: camera.center.longitude,
        },
        maxRadius,
      );

      // Optionally validate the position
      const isValid = validatePosition(
        {
          latitude: camera.center.latitude,
          longitude: camera.center.longitude,
        },
        randomPosition,
        maxRadius,
      );

      if (isValid) {
        router.navigate({
          pathname: "/map",
          params: {
            latitude: randomPosition.latitude,
            longitude: randomPosition.longitude,
          },
        });
      } else {
        console.error("Generated position is outside the specified radius");
      }
    } else {
      console.error("Camera position not available");
    }
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
    } else {
      mapRef.current?.animateCamera({ center: centerCoordinates });
    }
  }, [userLocation, isInitialLocationSet, centerCoordinates]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        showsUserLocation
        loadingEnabled
        on={
          (region) => {
            console.debug("🚀\x1b[35m ~ file: InitialLocationMap.tsx:100 ~ InitialLocationMap ~ region\x1b[0m", region)

          }
        }
        initialCamera={{
          center: centerCoordinates,
          heading: 2.1,
          pitch: 1,
          zoom: 1,
          altitude: 1500,
        }}
      />
      <CenteredMarker mapRef={mapRef} maxRadius={maxRadius} />
      <MapButtons variant="right">
        <CenterUserLocation mapRef={mapRef} />
        <RadiusSlider maxRadius={maxRadius} setMaxRadius={setMaxRadius} />
      </MapButtons>
      <LocationSearchBar searchCoordinates={centerCoordinates} />
      <SearchNearPinButton onPress={navigateToMap} />
    </View>
  );
}

export default InitialLocationMap;
