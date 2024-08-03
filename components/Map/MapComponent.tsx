import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useLocalSearchParams } from "expo-router";
import Loader from "../Loader";
import RestaurantSwiper from "../Swiper/RestaurantSwiper";
import RefreshButton from "./RefreshButton";
import { RestaurantProvider, useRestaurantContext } from "./RestaurantContext";
import { useUserLocationContext } from "../Index/UserLocationContext";
import MapButtons from "../common/MapButtons";
import CenterUserLocation from "../common/CenterUserLocation";
import NavigateHomeButton from "../common/NavigateHomeButton";

type MapSettings = {
  mapType: "standard" | "satelliteFlyover";
};

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  mapTypeButton: {
    width: 40,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  mapTypeButtonText: {
    fontWeight: "bold",
  },
  floatingButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: 10,

    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

function MapComponentInner() {
  const { latitude, longitude } = useLocalSearchParams();

  const { restaurants, currentRestaurant, fetchRestaurants, isSpinning } =
    useRestaurantContext();
  const { userLocation } = useUserLocationContext();

  const mapRef = useRef<MapView>(null);

  const [mapSettings, setMapSettings] = useState<MapSettings>({
    mapType: "satelliteFlyover",
  });
  const toggleMapSetting = () => {
    setMapSettings((prevSettings) => ({
      mapType:
        prevSettings.mapType === "standard" ? "satelliteFlyover" : "standard",
    }));
  };

  const refreshRestaurants = useCallback(() => {
    fetchRestaurants(latitude as string, longitude as string);
  }, [fetchRestaurants, latitude, longitude]);

  useEffect(() => {
    refreshRestaurants();
  }, []);

  useEffect(() => {
    if (currentRestaurant && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: currentRestaurant.latitude - 0.0009,
            longitude: currentRestaurant.longitude,
          },
          ...(mapSettings.mapType === "satelliteFlyover" && {
            heading: 2.1, // Minimum heading required to trigger compass (to avoid overlap of MapButtons)
            pitch: 50,
            zoom: 17,
            altitude: 300,
          }),
          ...(mapSettings.mapType === "standard" && {
            heading: 2.1, // Minimum heading required to trigger compass (to avoid overlap of MapButtons)
            pitch: 0,
            zoom: 17,
            altitude: 1500,
          }),
        },
        { duration: 1000 },
      );
    }
  }, [currentRestaurant, mapSettings.mapType]);

  return restaurants.length === 0 ? (
    <Loader size="large" />
  ) : (
    <View style={styles.mapContainer}>
      {currentRestaurant && (
        <MapView
          style={styles.map}
          mapType={mapSettings.mapType}
          showsBuildings={false}
          ref={mapRef}
          showsCompass
          showsUserLocation
        >
          {restaurants.map((restaurant, index) => (
            <Marker
              pinColor={
                currentRestaurant?.name === restaurant.name ? "darkblue" : "red"
              }
              key={`${restaurant.name}_${index.toString()}`}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}
              title={restaurant.name}
              description={restaurant.type}
            />
          ))}
        </MapView>
      )}
      <MapButtons variant="right">
        <TouchableOpacity
          style={styles.mapTypeButton}
          onPress={toggleMapSetting}
        >
          <Text style={styles.mapTypeButtonText}>
            {mapSettings.mapType === "standard" ? "3D" : "2D"}
          </Text>
        </TouchableOpacity>
        <RefreshButton
          onPress={refreshRestaurants}
          isSpinning={isSpinning}
          styles={styles}
        />
        <CenterUserLocation
          userLocation={userLocation}
          mapRef={mapRef}
          addOffset
        />
        <NavigateHomeButton style={styles.mapTypeButton} />
      </MapButtons>
    </View>
  );
}

function MapComponent() {
  return (
    <RestaurantProvider>
      <MapComponentInner />
      <RestaurantSwiper />
    </RestaurantProvider>
  );
}

export default MapComponent;
