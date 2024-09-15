import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import Colors from "apple-colors";
import Swiper from "react-native-deck-swiper";
import { Restaurant } from "../Map/RestaurantContext";
import FlameRating from "../common/FlameRating";
import StyledIconText from "../common/StyledIconText";

interface Props {
  restaurant: Restaurant;
  swiperRef: React.RefObject<Swiper<Restaurant>>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.iOS.Light.Grey2,
    padding: 0,
    margin: 10,
    overflow: "hidden",
  },
  imageContainer: {
    height: 250,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    backgroundColor: Colors.iOS.Light.Grey6,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
    marginTop: -20, // Pull the content up to overlap with the image
  },
  titleContainer: {
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    padding: 10,
    flexShrink: 1,
    fontSize: 14,
    color: Colors.iOS.Dark.Grey3,
  },
  footer: {
    borderRadius: 25,
    backgroundColor: Colors.iOS.Light.Grey5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

function RestaurantCard({ restaurant, swiperRef }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Card.Image
          source={{
            uri: restaurant.photoUrl ?? "https://via.placeholder.com/300",
          }}
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{restaurant.name}</Text>
          <StyledIconText
            text={restaurant.openNow ? "OPEN" : "CLOSE"}
            iconName="time-outline"
            iconColor={
              restaurant.openNow ? Colors.iOS.Light.Grey1 : Colors.iOS.Light.Red
            }
          />
        </View>

        <Card.Divider />
        <FlameRating
          rating={restaurant.rating ?? 0.5}
          totalRatings={restaurant.totalRatings}
        />
        <View style={styles.footer}>
          <Text style={styles.address}>{restaurant.address}</Text>
          <TouchableOpacity onPress={() => swiperRef.current?.swipeLeft()}>
            <Ionicons
              name="close-circle"
              size={40}
              color={Colors.iOS.Light.Red}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => swiperRef.current?.swipeRight()}>
            <Ionicons
              name="checkmark-circle"
              size={40}
              color={Colors.iOS.Light.Green}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default RestaurantCard;
