import { useCrime } from "@/contexts/crimeContext";
import { useTheme } from "@/contexts/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

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

export default function Index() {
  const { crimes } = useCrime();
  const { currentThemeObject, isLightTheme } = useTheme();
  const router = useRouter();

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
