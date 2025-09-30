import ThemePressable from "@/components/ThemePressable";
import { useTheme } from "@/contexts/themeContext";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const { currentThemeObject, contextTheme, changeTheme, isLightTheme } = useTheme();

  const availableThemes = [
    { name: "white", displayName: "White", color: "#FFFFFF" },
    { name: "black", displayName: "Black", color: "#000000" },
    { name: "purple", displayName: "Purple", color: "#800080" },
    { name: "red", displayName: "Red", color: "#FF0000" },
    { name: "green", displayName: "Green", color: "#00FF00" },
    { name: "blue", displayName: "Blue", color: "#0000FF" },
  ];

  // Use a consistent button color based on the current theme background
  // This ensures all buttons look the same regardless of which theme is selected
  const buttonColor = currentThemeObject.color;

  // Use the centralized theme logic from context
  const titleTextColor = isLightTheme ? "#000000" : "#FFFFFF";

  return (
    <View style={[styles.container, { backgroundColor: currentThemeObject.color }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: titleTextColor }]}>Pick a Theme</Text>

        <View style={styles.themeContainer}>
          {availableThemes.map((theme) => (
            <ThemePressable
              key={theme.name}
              label={theme.displayName}
              color={buttonColor}
              onPress={() => changeTheme(theme.name)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  themeContainer: {
    width: "100%",
    maxWidth: 400,
  },
});
