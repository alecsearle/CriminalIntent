import { useTheme } from "@/contexts/themeContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// Simple local type definition
type Crime = {
  id: string;
  title: string;
  date: string;
  solved: boolean;
  details?: string;
  photo?: string | null;
};

type CrimeItemProps = {
  id: string;
  title: string;
  date: string;
  solved: boolean;
  onPress: () => void;
  textColor: string;
  backgroundColor: string;
  borderColor: string;
};

function CrimeItem({
  id,
  title,
  date,
  solved,
  onPress,
  textColor,
  backgroundColor,
  borderColor,
}: CrimeItemProps) {
  return (
    <Pressable style={[styles.crimeItem, { backgroundColor, borderColor }]} onPress={onPress}>
      <View style={styles.crimeContent}>
        <Text style={[styles.crimeTitle, { color: textColor }]}>{title}</Text>
        <Text style={[styles.crimeDate, { color: textColor, opacity: 0.7 }]}>{date}</Text>
      </View>
      {solved && (
        <Ionicons name="hand-left" size={24} color={textColor} style={styles.handcuffIcon} />
      )}
    </Pressable>
  );
}

// Simple ID generator
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export default function Index() {
  const { currentThemeObject, isLightTheme } = useTheme();
  const router = useRouter();

  // Local state for crimes
  const [crimes, setCrimes] = useState<Crime[]>([
    {
      id: "1",
      title: "Test Crime 1",
      date: "2025-01-30T13:13:43.639Z",
      solved: false,
    },
    {
      id: "2",
      title: "Test Crime 2",
      date: "2025-01-24T21:44:40.415Z",
      solved: false,
    },
    {
      id: "3",
      title: "Test Crime 3",
      date: "2025-01-03T02:14:54.649Z",
      solved: true,
    },
  ]);

  // Load crimes from AsyncStorage when screen focuses
  useFocusEffect(
    useCallback(() => {
      loadCrimes();
    }, [])
  );

  const loadCrimes = async () => {
    try {
      const savedCrimes = await AsyncStorage.getItem("@crimes");
      if (savedCrimes) {
        setCrimes(JSON.parse(savedCrimes));
      } else {
        // Initialize with default crimes if none exist
        const defaultCrimes = [
          {
            id: "1",
            title: "Test Crime 1",
            date: "2025-01-30T13:13:43.639Z",
            solved: false,
          },
          {
            id: "2",
            title: "Test Crime 2",
            date: "2025-01-24T21:44:40.415Z",
            solved: false,
          },
          {
            id: "3",
            title: "Test Crime 3",
            date: "2025-01-03T02:14:54.649Z",
            solved: true,
          },
        ];
        setCrimes(defaultCrimes);
        await AsyncStorage.setItem("@crimes", JSON.stringify(defaultCrimes));
      }
    } catch (error) {
      console.error("Error loading crimes:", error);
    }
  };

  const textColor = isLightTheme ? "#000000" : "#FFFFFF";
  const itemBackgroundColor = isLightTheme ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)";
  const borderColor = isLightTheme ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";

  const handleCrimePress = (crimeId: string) => {
    router.push(`/crimedetail?id=${crimeId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: currentThemeObject.color }]}>
      <FlatList
        data={crimes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CrimeItem
            id={item.id}
            title={item.title}
            date={item.date}
            solved={item.solved}
            onPress={() => handleCrimePress(item.id)}
            textColor={textColor}
            backgroundColor={itemBackgroundColor}
            borderColor={borderColor}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  crimeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  crimeContent: {
    flex: 1,
  },
  crimeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  crimeDate: {
    fontSize: 14,
  },
  handcuffIcon: {
    marginLeft: 16,
  },
});
