import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, StyleSheet, View } from "react-native";

type ImagePickerProps = {
  image: string | null;
  onImageChange: (uri: string | null) => void;
};

export default function ImagePickerExample({ image, onImageChange }: ImagePickerProps) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Pressable onPress={pickImage} style={styles.imagePickerButton}>
        <Ionicons name="camera-outline" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  imagePickerButton: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
});
