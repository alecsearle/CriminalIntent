import ThemedStatusBar from "@/components/ThemedStatusBar";
import { CrimeProvider } from "@/contexts/crimeContext";
import { ThemeProvider, useTheme } from "@/contexts/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, usePathname, useRouter } from "expo-router";
import { Pressable } from "react-native";

function HeaderButtons() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLightTheme } = useTheme();

  // Use the centralized theme logic from context
  const iconColor = isLightTheme ? "#000000" : "#FFFFFF";

  const handleAddCrime = () => {
    router.push("/crimedetail");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <>
      {/* Only show the + button on the index screen */}
      {pathname === "/" && (
        <Pressable onPress={handleAddCrime} style={{ marginRight: 15 }}>
          <Ionicons name="add" size={24} color={iconColor} />
        </Pressable>
      )}
      <Pressable onPress={handleSettings}>
        <Ionicons name="settings" size={24} color={iconColor} />
      </Pressable>
    </>
  );
}

function ThemedStack() {
  const { currentThemeObject, isLightTheme } = useTheme();

  // Use the centralized theme logic from context
  const headerTintColor = isLightTheme ? "#000000" : "#FFFFFF";

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: currentThemeObject.color },
        headerTintColor: headerTintColor,
        headerTitleStyle: { fontWeight: "bold" },
        headerTitle: "Criminal Intent",
        headerRight: () => <HeaderButtons />,
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <CrimeProvider>
        <ThemedStatusBar />
        <ThemedStack />
      </CrimeProvider>
    </ThemeProvider>
  );
}
