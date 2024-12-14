import Colors from "apple-colors";
import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import MapView from "react-native-maps";

const MARKER_SIZE = 20;
const MAX_RING_SIZE = 50; // Maximum size of the outer ring

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "50%",
    left: "50%",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  markerContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    borderRadius: MARKER_SIZE / 2,
    backgroundColor: Colors.iOS.Light.Blue,
    borderColor: "white",
    borderWidth: 2,
  },
  ring: {
    position: "absolute",
    borderWidth: 2,
    backgroundColor: Colors.iOS.Light.Blue,
    borderColor: Colors.iOS.Light.Blue,
    opacity: 0.2,
  },
  radiusTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  radiusText: {
    color: Colors.iOS.Light.Indigo,
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  }
});

interface Props {
  mapRef: React.RefObject<MapView>;
  maxRadius: number;
}

function CenteredMarker({ maxRadius, mapRef }: Props) {
  const animatedSize = useRef(new Animated.Value(MARKER_SIZE)).current;


  useEffect(() => {


    mapRef.current?.getCamera().then(({ altitude }) => {
      console.debug("🚀\x1b[35m ~ file: CenteredMarker.tsx:63 ~ mapRef.current?.getCamera() ~ altitude\x1b[0m", altitude)
      if (altitude) animatedSize.setOffset(altitude / 100)
    })

  }, [mapRef.current?.state])


  useEffect(() => {
    const targetSize =
      MARKER_SIZE + (MAX_RING_SIZE - MARKER_SIZE) * (maxRadius * (1 / 100));

    console.debug("🚀\x1b[35m ~ file: CenteredMarker.tsx:66 ~ useEffect ~ targetSize\x1b[0m", targetSize)


    Animated.spring(animatedSize, {
      toValue: targetSize,
      useNativeDriver: false,
    }).start();

  }, [maxRadius, animatedSize]);

  const containerStyle = {
    width: MAX_RING_SIZE,
    height: MAX_RING_SIZE,
    marginLeft: -MAX_RING_SIZE / 2,
    marginBottom: -MAX_RING_SIZE / 2,
  };

  const ringStyle = {
    ...styles.ring,
    width: animatedSize,
    height: animatedSize,
    borderRadius: Animated.divide(animatedSize, 2),
  };

  const radiusTextContainerStyle = {
    ...styles.radiusTextContainer,
    width: animatedSize,
    height: animatedSize,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View style={ringStyle} />
      <Animated.View style={radiusTextContainerStyle}>
        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <Text style={styles.radiusText}>
            {maxRadius} m
          </Text>
        </View>
      </Animated.View>
      <View style={styles.markerContainer}>
        <View style={styles.marker} />
      </View>
    </View>
  );
}

export default CenteredMarker;