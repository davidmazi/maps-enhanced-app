import React from "react";
import { Text } from "react-native";
import { Card } from "@rneui/themed";
import FlameRating from "../common/FlameRating";
import { Restaurant } from "../Map/RestaurantContext";

interface Props {
  restaurant: Restaurant;
}

function RestaurantCard({ restaurant }: Props) {
  return (
    <Card containerStyle={{ borderRadius: 25 }}>
      <Card.Title>{restaurant.name}</Card.Title>
      <FlameRating rating={restaurant.rating ?? 0.5} />
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
  );
}

export default RestaurantCard;
