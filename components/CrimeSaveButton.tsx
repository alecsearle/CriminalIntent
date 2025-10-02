import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type CrimeSaveButtonProps = {
  onSave: () => void;
  isEditing: boolean;
  backgroundColor: string;
  textColor: string;
};

export default function CrimeSaveButton({
  onSave,
  isEditing,
  backgroundColor,
  textColor,
}: CrimeSaveButtonProps) {
  return (
    <Pressable style={[styles.saveButton, { backgroundColor }]} onPress={onSave}>
      <Text style={[styles.saveButtonText, { color: textColor }]}>
        {isEditing ? "UPDATE" : "SAVE"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
