import { AirbnbRating, Card } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Restaurant, useRestaurantContext } from "../Map/RestaurantContext";

export type SwipeDirection = "left" | "right";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginTop: "75%",
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
  // Handle Swipe

  useEffect(() => {
    if (swipeAction) {
      const { index, direction } = swipeAction;
      const restaurant = restaurants[index];

      switch (direction) {
        case "right":
          if (currentRestaurant) {
            setRestaurants([currentRestaurant]);
            setCurrentRestaurant(restaurant);
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
          cards={restaurants}
          renderCard={(restaurant: Restaurant) => (
            <Card containerStyle={{ borderRadius: 25 }}>
              <Card.Title>{restaurant.name}</Card.Title>
              <AirbnbRating
                isDisabled
                showRating={false}
                size={15}
                defaultRating={restaurant.rating ?? 0.5}
              />
              <Card.Divider />
              <Text>{restaurant.type}</Text>
              <Card.Image
                style={{ padding: 0, borderRadius: 25, marginVertical: 10 }}
                source={{
                  uri: restaurant.photoUrl ?? undefined,
                }}
              />
              <Card.Divider />
              <Text>{restaurant.address}</Text>
            </Card>
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
