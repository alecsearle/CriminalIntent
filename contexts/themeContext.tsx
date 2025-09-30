import React, { createContext, ReactNode, useContext, useState } from "react";

type StatusBarStyle = "light" | "dark" | "auto";

type ThemeObject = {
  color: string;
  statusbar: StatusBarStyle;
};

type ThemeContextType = {
  contextTheme: string;
  currentThemeObject: ThemeObject;
  changeTheme: (themeName: string) => void;
  isLightTheme: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

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

  const currentThemeObject = themeConfig[contextTheme] || themeConfig.purple;
  const isLightTheme = isThemeLight(contextTheme);

  const changeTheme = (themeName: string) => {
    if (themeConfig[themeName]) {
      setContextTheme(themeName);
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
