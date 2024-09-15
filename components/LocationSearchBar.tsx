import Colors from "apple-colors";
import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
} from "react-native-google-places-autocomplete";
import { UserLocation } from "./Index/UserLocationContext";

const windowWidth = Dimensions.get("window").width;
const containerWidth = windowWidth * 0.7; // 70% of screen width (100% - 15% * 2)

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: windowWidth * 0.15, // 15% from left
    width: containerWidth,
    alignItems: "flex-start",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.iOS.Light.Grey6,
    borderWidth: 0.5,
    borderColor: Colors.iOS.Light.Grey2,
    borderRadius: 20,
    opacity: 0.95,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color: Colors.iOS.Light.Grey2,
  },
  icon: {
    padding: 10,
  },
});

interface Props {
  searchCoordinates: UserLocation;
}

function LocationSearchBar({ searchCoordinates }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialWidth = 40;
  const animatedWidth = useRef(new Animated.Value(initialWidth)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedWidth, {
        toValue: isExpanded ? containerWidth : initialWidth,
        duration: 300,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }),
      Animated.timing(animatedOpacity, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (isExpanded) {
        inputRef.current?.focus();
      }
    });
  }, [isExpanded]);

  const handlePress = () => {
    setIsExpanded(true);
    console.debug(
      "🚀\x1b[35m ~ file: LocationSearchBar.tsx:83 ~ handlePress ~ userLocation\x1b[0m",
      searchCoordinates,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Animated.View
          style={[styles.searchContainer, { width: animatedWidth }]}
        >
          <Ionicons
            name="search"
            size={20}
            color={Colors.iOS.Light.Grey2}
            style={styles.icon}
          />
          <Animated.View style={{ flex: 1, opacity: animatedOpacity }}>
            <GooglePlacesAutocomplete
              ref={inputRef}
              // styles={styles.input}
              placeholder="Search"
              fetchDetails
              onPress={(data, details) => {
                console.debug(
                  "🚀\x1b[35m ~ file: LocationSearchBar.tsx:121 ~ LocationSearchBar ~ details\x1b[0m",
                  details,
                );
                console.debug(
                  "🚀\x1b[35m ~ file: LocationSearchBar.tsx:121 ~ LocationSearchBar ~ data\x1b[0m",
                  data,
                );
                // 'details' is provided when fetchDetails = true
              }}
              nearbyPlacesAPI="GoogleReverseGeocoding"
              onFail={(error) => console.error(error)}
              query={{
                key: process.env.EXPO_PUBLIC_GMAPSKEY,
                language: "en",
                location: `${searchCoordinates?.latitude},${searchCoordinates?.longitude}`,
                radius: 10,
              }}
            />
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default LocationSearchBar;
