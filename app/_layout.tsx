import ThemedStatusBar from "@/components/ThemedStatusBar";
import { ThemeProvider, useTheme } from "@/contexts/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, usePathname, useRouter } from "expo-router";
import { Pressable } from "react-native";

function HeaderButtons() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLightTheme } = useTheme();
  const iconColor = isLightTheme ? "#000000" : "#FFFFFF";

  const handleAddCrime = () => {
    router.push("/crimedetail");
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <>
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
    >
      <Stack.Screen
        name="crimedetail/index"
        options={{
          headerTitle: "Crime Detail",
          headerRight: undefined, // Remove the header buttons on detail screen
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStatusBar />
      <ThemedStack />
    </ThemeProvider>
  );
}
