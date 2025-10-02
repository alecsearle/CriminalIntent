import { Checkbox } from "expo-checkbox";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CrimeSolvedSectionProps = {
  solved: boolean;
  onSolvedChange: (solved: boolean) => void;
};

export default function CrimeSolvedSection({ solved, onSolvedChange }: CrimeSolvedSectionProps) {
  return (
    <View style={styles.solvedContainer}>
      <Checkbox style={styles.checkbox} value={solved} onValueChange={onSolvedChange} />
      <Text style={styles.solvedText}>Solved</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
