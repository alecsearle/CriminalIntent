import DatePicker from "@/components/DatePicker";
import ImagePicker from "@/components/ImagePicker";
import { useCrime } from "@/contexts/crimeContext";
import { useTheme } from "@/contexts/themeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function CrimeDetail() {
  const { currentThemeObject, isLightTheme } = useTheme();
  const { addCrime, updateCrime, getCrimeById } = useCrime();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  // Check if we're editing an existing crime
  const existingCrime = id ? getCrimeById(id as string) : undefined;
  const isEditing = !!existingCrime;

  // Form state
  const [title, setTitle] = useState(existingCrime?.title || "");
  const [details, setDetails] = useState(existingCrime?.details || "");
  const [date, setDate] = useState(existingCrime?.date || new Date().toISOString());
  const [photo, setPhoto] = useState<string | null>(existingCrime?.photo || null);
  const [solved, setSolved] = useState(existingCrime?.solved || false);

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

    const crimeData = {
      title: title.trim(),
      details: details.trim(),
      date,
      photo,
      solved,
    };

    try {
      if (isEditing && existingCrime) {
        // Update existing crime
        await updateCrime(existingCrime.id, crimeData);
        Alert.alert("Crime Updated", `Crime "${title}" has been updated successfully!`, [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        // Add new crime
        await addCrime(crimeData);
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
        {/* Photo and Title Section */}
        <View style={styles.topSection}>
          {/* Photo Placeholder */}
          <View style={styles.photoContainer}>
            <ImagePicker image={photo} onImageChange={setPhoto} />
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.titleLabel}>Title</Text>
            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              placeholderTextColor="#999"
              value={title}
              onChangeText={setTitle}
            />
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.detailsLabel}>Details</Text>
          <TextInput
            style={styles.detailsInput}
            placeholder="What happened?"
            placeholderTextColor="#999"
            value={details}
            onChangeText={setDetails}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Date Button */}
        <Pressable style={[styles.dateButton, { backgroundColor: currentThemeObject.color }]}>
          <Text style={[styles.dateButtonText, { color: isLightTheme ? "#000" : "#fff" }]}>
            <DatePicker />
          </Text>
        </Pressable>
        {/* Solved Checkbox */}
        <View style={styles.solvedContainer}>
          <Pressable
            style={[
              styles.checkbox,
              solved && {
                backgroundColor: currentThemeObject.color,
                borderColor: currentThemeObject.color,
              },
            ]}
            onPress={() => setSolved(!solved)}
          >
            {solved && (
              <View style={{ width: 12, height: 12, backgroundColor: "#fff", borderRadius: 2 }} />
            )}
          </Pressable>
          <Text style={styles.solvedText}>Solved</Text>
        </View>

        {/* Save Button */}
        <Pressable
          style={[styles.saveButton, { backgroundColor: currentThemeObject.color }]}
          onPress={handleSaveCrime}
        >
          <Text style={[styles.saveButtonText, { color: isLightTheme ? "#000" : "#fff" }]}>
            SAVE
          </Text>
        </Pressable>
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
  topSection: {
    flexDirection: "row",
    marginBottom: 30,
  },
  photoContainer: {
    marginRight: 20,
  },
  photo: {
    width: 120,
    height: 90,
    borderRadius: 4,
  },
  photoPlaceholder: {
    width: 120,
    height: 90,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  titleSection: {
    flex: 1,
  },
  titleLabel: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  titleInput: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingVertical: 8,
    color: "#000",
  },
  detailsSection: {
    marginBottom: 20,
  },
  detailsLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 15,
    fontSize: 16,
    height: 120,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    color: "#000",
  },
  dateButton: {
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  solvedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  solvedText: {
    fontSize: 16,
    color: "#000",
  },
  saveButton: {
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
