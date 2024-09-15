import React, { ComponentProps } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RepeatingIconProps {
  count: number;
  value: number;
  size?: number;
  colors: {
    active: string;
    inactive: string;
  };
  icons: {
    active: ComponentProps<typeof Ionicons>["name"];
    inactive: ComponentProps<typeof Ionicons>["name"];
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  iconContainer: {
    marginRight: 2,
  },
});

function RepeatingIcon({
  count,
  value,
  size = 24,
  colors,
  icons,
}: RepeatingIconProps): React.ReactElement {
  const safeValue = Math.max(0, Math.min(count, value));

  function renderIcon(index: number) {
    const filled = Math.min(Math.max(safeValue - index, 0), 1);

    return (
      <View
        key={index}
        style={[styles.iconContainer, { width: size, height: size }]}
      >
        <Ionicons
          name={icons.inactive}
          size={size}
          color={colors.inactive}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={{ overflow: "hidden", width: `${filled * 100}%` }}>
          <Ionicons name={icons.active} size={size} color={colors.active} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Array.from({ length: count }, (_, i) => renderIcon(i))}
    </View>
  );
}

export default RepeatingIcon;
