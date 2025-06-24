import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const PredictScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [webFile, setWebFile] = useState<File | null>(null);

  const pickImage = async () => {
    if (Platform.OS === "web") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = () => {
        if (input.files && input.files.length > 0) {
          const file = input.files[0];
          setWebFile(file);
          const objectUrl = URL.createObjectURL(file);
          setImage(objectUrl);
          setPrediction(null);
        }
      };
      input.click();
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const pickedImage = result.assets[0].uri;
        setImage(pickedImage);
        setPrediction(null);
      }
    }
  };

  const predictDisease = async () => {
    if (!image) return;

    const formData = new FormData();

    if (Platform.OS === "web") {
      if (!webFile) return;
      formData.append("file", webFile);
    } else {
      formData.append("file", {
        uri: image,
        name: "image.jpg",
        type: "image/jpeg",
      } as any);
    }

    try {
      setLoading(true);
      const response = await axios.post("http://10.201.4.34:8000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPrediction(response.data.prediction || "No result");
    } catch (error) {
      console.error("Prediction error:", error);
      Alert.alert("Error", "Failed to connect to backend or predict.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload a Soybean Leaf Image</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </TouchableOpacity>

      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.button} onPress={predictDisease}>
            <Text style={styles.buttonText}>Predict Disease</Text>
          </TouchableOpacity>
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#2e7d32" style={{ marginTop: 10 }} />}

      {prediction && (
        <Text style={styles.prediction}>
          Predicted Disease: <Text style={styles.bold}>{prediction}</Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#e8f5e9",
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
    color: "#2e7d32",
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 250,
    marginVertical: 20,
    borderRadius: 12,
    resizeMode: "cover",
  },
  prediction: {
    fontSize: 18,
    color: "#1b5e20",
    marginTop: 20,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PredictScreen;
