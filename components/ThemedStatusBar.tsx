import type { StatusBarStyle } from "expo-status-bar";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../contexts/themeContext";

const ThemedStatusBar = () => {
  const { currentThemeObject } = useTheme();

  let statusBarStyle: StatusBarStyle;
  if (currentThemeObject.statusbar === "light") {
    statusBarStyle = "light";
  } else if (currentThemeObject.statusbar === "dark") {
    statusBarStyle = "dark";
  } else {
    statusBarStyle = "auto";
  }

  return <StatusBar style={statusBarStyle} />;
};

export default ThemedStatusBar;
