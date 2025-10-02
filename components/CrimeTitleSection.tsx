import ImagePicker from "@/components/ImagePicker";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type CrimeTitleSectionProps = {
  photo: string | null;
  onImageChange: (image: string | null) => void;
  title: string;
  onTitleChange: (title: string) => void;
};

export default function CrimeTitleSection({
  photo,
  onImageChange,
  title,
  onTitleChange,
}: CrimeTitleSectionProps) {
  return (
    <View style={styles.topSection}>
      {/* Photo Placeholder */}
      <View style={styles.photoContainer}>
        <ImagePicker image={photo} onImageChange={onImageChange} />
      </View>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.titleLabel}>Title</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={onTitleChange}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topSection: {
    flexDirection: "row",
    marginBottom: 30,
  },
  photoContainer: {
    marginRight: 20,
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
});
