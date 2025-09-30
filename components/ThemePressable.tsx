import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

// function to determine if a color is light or dark
function isLightColor(color: string): boolean {
  const lightColors = ["#FFFFFF", "#00FF00", "#FF0000"]; // White, Green, Blue
  return lightColors.includes(color.toUpperCase());
}

type ThemePressableProps = {
  label: string;
  onPress: () => void;
  color?: string;
};

function ThemePressable({ label, onPress, color = "#C1440F" }: ThemePressableProps) {
  // Automatically determine if the background is light or dark
  const isLightBackground = isLightColor(color);

  const textColor = isLightBackground ? "#000000" : "#FFFFFF";
  const borderColor = isLightBackground ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)";
  const backgroundColor = isLightBackground ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)";
  const pressedBackgroundColor = isLightBackground
    ? "rgba(0, 0, 0, 0.1)"
    : "rgba(255, 255, 255, 0.15)";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? pressedBackgroundColor : backgroundColor,
          borderColor: borderColor,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    height: 56,
  },
  text: {
    fontSize: 18,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.9,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default ThemePressable;
