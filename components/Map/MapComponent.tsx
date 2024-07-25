import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { StatusBar } from "expo-status-bar";
import Loader from "../Loader";
import RestaurantSwiper from "../Swiper/RestaurantSwiper";
import RefreshButton from "./RefreshButton";
import { RestaurantProvider, useRestaurantContext } from "./RestaurantContext";

type UserLocation = {
  latitude: number;
  longitude: number;
};

type MapSettings = {
  mapType: "standard" | "satelliteFlyover";
  showsBuildings: boolean;
};

const styles = StyleSheet.create({
  mapContainer: {
    height: "100%",
    backgroundColor: "plum",
  },
  map: {
    width: "100%",
    // height: "100%",
  },
  buttonsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "column",
    alignItems: "center",
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
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

function MapComponentInner() {
  const { restaurants, currentRestaurant, fetchRestaurants, isSpinning } =
    useRestaurantContext();
  const [userLocation, setUserLocation] = useState<UserLocation>();
  const mapRef = useRef<MapView>(null);

  const [mapSettings, setMapSettings] = useState<MapSettings>({
    mapType: "satelliteFlyover",
    showsBuildings: true,
  });
  const toggleMapSetting = () => {
    setMapSettings((prevSettings) => ({
      mapType:
        prevSettings.mapType === "standard" ? "satelliteFlyover" : "standard",
      showsBuildings: prevSettings.mapType === "standard",
    }));
  };

  useEffect(() => {
    fetchRestaurants();

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, [fetchRestaurants]);

  useEffect(() => {
    if (currentRestaurant && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: currentRestaurant.latitude - 0.0005,
            longitude: currentRestaurant.longitude,
          },
          ...(mapSettings.mapType === "satelliteFlyover" && {
            heading: 0,
            pitch: 50,
            zoom: 17,
            altitude: 300,
          }),
          ...(mapSettings.mapType === "standard" && {
            heading: 0,
            pitch: 0,
            zoom: 17,
            altitude: 750,
          }),
        },
        { duration: 1000 },
      );
    }
  }, [currentRestaurant, mapSettings.mapType]);

  return restaurants.length === 0 ? (
    <Loader />
  ) : (
    <View style={styles.mapContainer}>
      <StatusBar translucent />
      {currentRestaurant && (
        <MapView
          style={styles.map}
          mapType={mapSettings.mapType}
          showsBuildings={false}
          ref={mapRef}
        >
          {userLocation && (
            <Marker
              pinColor="darkgreen"
              coordinate={userLocation}
              title="You are here"
              description="Your current location"
            />
          )}
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
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.mapTypeButton}
          onPress={toggleMapSetting}
        >
          <Text style={styles.mapTypeButtonText}>
            {mapSettings.mapType === "standard" ? "3D" : "2D"}
          </Text>
        </TouchableOpacity>
        <RefreshButton
          onPress={fetchRestaurants}
          isSpinning={isSpinning}
          styles={styles}
        />
      </View>
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
