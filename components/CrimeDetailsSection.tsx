import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type CrimeDetailsSectionProps = {
  details: string;
  onDetailsChange: (details: string) => void;
};

export default function CrimeDetailsSection({
  details,
  onDetailsChange,
}: CrimeDetailsSectionProps) {
  return (
    <View style={styles.detailsSection}>
      <Text style={styles.detailsLabel}>Details</Text>
      <TextInput
        style={styles.detailsInput}
        placeholder="What happened?"
        placeholderTextColor="#999"
        value={details}
        onChangeText={onDetailsChange}
        multiline
        textAlignVertical="top"
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
