import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const diseases = [
  "Mossaic Virus", "Southern blight", "Sudden Death Syndrone", "Yellow Mosaic",
  "bacterial_blight", "brown_spot", "crestamento", "ferrugen", "powdery_mildew", "septoria"
];

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌿 Soybean Disease Detection</Text>
      <Text style={styles.paragraph}>
        This app helps farmers detect soybean leaf diseases by uploading an image. Below are the 10 diseases we can detect:
      </Text>

      {diseases.map((disease, index) => (
        <Text key={index} style={styles.disease}>• {disease}</Text>
      ))}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
        <Text style={styles.buttonText}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Predict Disease')}>
        <Text style={styles.buttonText}>Predict Disease</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f8e9',
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    color: '#1b5e20',
    marginBottom: 15,
  },
  disease: {
    fontSize: 15,
    color: '#388e3c',
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginTop: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
