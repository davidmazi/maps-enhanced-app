import React, { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import openMap from "react-native-open-maps";
import { Restaurant, useRestaurantContext } from "../Map/RestaurantContext";
import RestaurantCard from "./RestaurantCard";

export type SwipeDirection = "left" | "right";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginTop: "80%",
  },
});

function RestaurantSwiper() {
  const {
    currentRestaurant,
    restaurants,
    setRestaurants,
    setCurrentRestaurant,
  } = useRestaurantContext();

  const [swipeAction, setSwipeAction] = useState<{
    index: number;
    direction: SwipeDirection;
  } | null>(null);
  const swiperRef = useRef<Swiper<Restaurant>>(null);

  // Handle Swipe
  useEffect(() => {
    if (swipeAction) {
      const { index, direction } = swipeAction;
      const restaurant = restaurants[index];

      switch (direction) {
        case "right":
          if (currentRestaurant) {
            setRestaurants([restaurant]);
            setCurrentRestaurant(restaurant);

            const isLongName = currentRestaurant.name.length > 50;

            const title = isLongName
              ? "Take me there!"
              : currentRestaurant.name;
            const message = isLongName
              ? currentRestaurant.name
              : "Take me there!";

            Alert.alert(title, message, [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () =>
                  openMap({
                    latitude: restaurant.latitude,
                    longitude: restaurant.longitude,
                    query: restaurant.name,
                  }),
              },
            ]);
          }
          break;
        case "left":
          setCurrentRestaurant(restaurants[index + 1] || null);
          break;
        default:
          break;
      }
      setSwipeAction(null);
    }
  }, [
    swipeAction,
    restaurants,
    currentRestaurant,
    setRestaurants,
    setCurrentRestaurant,
  ]);

  const handleSwipe = (index: number, direction: SwipeDirection) => {
    setSwipeAction({ index, direction });
  };

  const onSwipedLeft = (index: number) => {
    handleSwipe(index, "left");
  };

  const onSwipedRight = (index: number) => {
    handleSwipe(index, "right");
  };

  return (
    currentRestaurant &&
    restaurants.length > 1 && (
      <View style={styles.container}>
        <Swiper
          ref={swiperRef}
          cards={restaurants}
          renderCard={(restaurant: Restaurant) => (
            <RestaurantCard
              swiperRef={swiperRef}
              restaurant={restaurant}
              key={restaurant.name}
            />
          )}
          verticalThreshold={Infinity}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          cardIndex={0}
          stackSize={restaurants.length / 2}
          useViewOverflow
        />
      </View>
    )
  );
}

export default RestaurantSwiper;
