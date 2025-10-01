import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

type StatusBarStyle = "light" | "dark" | "auto";

type ThemeObject = {
  color: string;
  statusbar: StatusBarStyle;
};

type ThemeContextType = {
  contextTheme: string;
  currentThemeObject: ThemeObject;
  changeTheme: (themeName: string) => Promise<void>;
  isLightTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = "@criminal_intent_theme";

// Centralized definition of light themes
const lightThemes = ["white", "green", "red"];

// Helper function to determine if a theme is light
const isThemeLight = (themeName: string): boolean => {
  return lightThemes.includes(themeName);
};

const themeConfig: Record<string, ThemeObject> = {
  blue: {
    color: "#0000FF",
    statusbar: "light",
  },
  purple: {
    color: "#800080",
    statusbar: "light",
  },
  green: {
    color: "#00FF00",
    statusbar: "dark",
  },
  yellow: {
    color: "#FFFF00",
    statusbar: "dark",
  },
  black: {
    color: "#000000",
    statusbar: "light",
  },
  white: {
    color: "#FFFFFF",
    statusbar: "dark",
  },
  red: {
    color: "#FF0000",
    statusbar: "light",
  },
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [contextTheme, setContextTheme] = useState<string>("purple");

  // Load theme from AsyncStorage on app start
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme && themeConfig[storedTheme]) {
        setContextTheme(storedTheme);
        console.log("Loaded theme from storage:", storedTheme);
      } else {
        // Save default theme if none exists
        await saveThemeToStorage("purple");
        console.log("Initialized with default theme: purple");
      }
    } catch (error) {
      console.error("Error loading theme:", error);
      // Keep default theme if storage fails
    }
  };

  const saveThemeToStorage = async (theme: string) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, theme);
      console.log("Saved theme to storage:", theme);
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const currentThemeObject = themeConfig[contextTheme] || themeConfig.purple;
  const isLightTheme = isThemeLight(contextTheme);

  const changeTheme = async (themeName: string) => {
    if (themeConfig[themeName]) {
      setContextTheme(themeName);
      await saveThemeToStorage(themeName);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        contextTheme,
        currentThemeObject,
        changeTheme,
        isLightTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
