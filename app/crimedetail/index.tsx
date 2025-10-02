import CrimeDateSection from "@/components/CrimeDateSection";
import CrimeDetailsSection from "@/components/CrimeDetailsSection";
import CrimeSaveButton from "@/components/CrimeSaveButton";
import CrimeSolvedSection from "@/components/CrimeSolvedSection";
import CrimeTitleSection from "@/components/CrimeTitleSection";
import { useTheme } from "@/contexts/themeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

// Simple ID generator
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export default function CrimeDetail() {
  const { currentThemeObject, isLightTheme } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;

  // Form state
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState(new Date().toISOString());
  const [photo, setPhoto] = useState<string | null>(null);
  const [solved, setSolved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load crime data when editing
  useFocusEffect(
    useCallback(() => {
      if (isEditing) {
        loadCrimeData();
      }
    }, [id])
  );

  const loadCrimeData = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const savedCrimes = await AsyncStorage.getItem("@crimes");
      if (savedCrimes) {
        const crimes = JSON.parse(savedCrimes);
        const crime = crimes.find((c: any) => c.id === id);

        if (crime) {
          setTitle(crime.title || "");
          setDetails(crime.details || "");
          setDate(crime.date || new Date().toISOString());
          setPhoto(crime.photo || null);
          setSolved(crime.solved || false);
        }
      }
    } catch (error) {
      console.error("Error loading crime data:", error);
      Alert.alert("Error", "Failed to load crime data.");
    } finally {
      setLoading(false);
    }
  };

  // Dynamic colors based on theme
  const textColor = isLightTheme ? "#000000" : "#FFFFFF";
  const placeholderColor = isLightTheme ? "#666666" : "#AAAAAA";
  const inputBackgroundColor = isLightTheme ? "#FFFFFF" : "#333333";
  const inputBorderColor = isLightTheme ? "#CCCCCC" : "#555555";

  const handleSaveCrime = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a crime title");
      return;
    }

    try {
      // Get existing crimes from AsyncStorage
      const savedCrimes = await AsyncStorage.getItem("@crimes");
      let crimes = [];

      if (savedCrimes) {
        crimes = JSON.parse(savedCrimes);
      } else {
        // If no crimes exist, start with the default ones
        crimes = [
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
      }

      if (isEditing && id) {
        // Update existing crime
        const crimeIndex = crimes.findIndex((c: any) => c.id === id);
        if (crimeIndex !== -1) {
          crimes[crimeIndex] = {
            ...crimes[crimeIndex],
            title: title.trim(),
            details: details.trim(),
            date,
            photo,
            solved,
          };
        }

        // Save back to AsyncStorage
        await AsyncStorage.setItem("@crimes", JSON.stringify(crimes));

        Alert.alert("Crime Updated", `Crime "${title}" has been updated successfully!`, [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        // Create new crime
        const newCrime = {
          id: generateId(),
          title: title.trim(),
          details: details.trim(),
          date,
          photo,
          solved,
        };

        // Add to crimes array
        crimes.push(newCrime);

        // Save back to AsyncStorage
        await AsyncStorage.setItem("@crimes", JSON.stringify(crimes));

        Alert.alert("Crime Saved", `Crime "${title}" has been saved successfully!`, [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      }
    } catch (error) {
      console.error("Error saving crime:", error);
      Alert.alert("Error", "Failed to save crime. Please try again.");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <CrimeTitleSection
          photo={photo}
          onImageChange={setPhoto}
          title={title}
          onTitleChange={setTitle}
        />

        <CrimeDetailsSection details={details} onDetailsChange={setDetails} />

        <CrimeDateSection date={date} onDateChange={setDate} textColor={textColor} />

        <CrimeSolvedSection solved={solved} onSolvedChange={setSolved} />

        <CrimeSaveButton
          onSave={handleSaveCrime}
          isEditing={isEditing}
          backgroundColor={currentThemeObject.color}
          textColor={isLightTheme ? "#000" : "#fff"}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
});
