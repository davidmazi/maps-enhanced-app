import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function Index() {
  type UserLocation = {
    latitude: number;
    longitude: number;
  };
  type Restaurant = {
    name: string;
    gmapsPhotoRef?: string;
    rating: number | null;
    address: string;
    type: string;
    latitude: number;
    longitude: number;
  };

  const [userLocation, setUserLocation] = useState<UserLocation>();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      fetchRestaurants();
    })();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:3000/restaurants");
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  if (!userLocation) {
    return null; // Or a loading indicator
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={userLocation}
          title="You are here"
          description="Your current location"
        />
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
            description={restaurant.type}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
