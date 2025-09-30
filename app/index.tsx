import React from "react";
import { Text } from "react-native";

import { useTheme } from "../contexts/themeContext";

export default function Index() {
  const { contextTheme, changeTheme } = useTheme();

  return (
    <>
      <Text>Welcome to the Criminal Intent!</Text>
      <Text style={{ color: contextTheme }}>Current Theme Color: {contextTheme}</Text>
    </>
  );
}
