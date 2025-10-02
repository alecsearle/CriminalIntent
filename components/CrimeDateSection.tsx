import DatePicker from "@/components/DatePicker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type CrimeDateSectionProps = {
  date: string;
  onDateChange: (date: string) => void;
  textColor: string;
};

export default function CrimeDateSection({ date, onDateChange, textColor }: CrimeDateSectionProps) {
  return (
    <View style={styles.dateSection}>
      <Text style={[styles.dateLabel, { color: textColor }]}>Date</Text>
      <Text style={[styles.dateText, { color: textColor }]}>
        {new Date(date).toLocaleDateString()}
      </Text>
      <View style={styles.datePickerContainer}>
        <DatePicker
          value={new Date(date)}
          onChange={(selectedDate) => onDateChange(selectedDate.toISOString())}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dateSection: {
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  datePickerContainer: {
    alignItems: "center",
  },
});
