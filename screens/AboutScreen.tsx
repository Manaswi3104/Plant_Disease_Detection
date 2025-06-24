import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📘 About This App</Text>
      <Text style={styles.text}>Created by Manaswi Mane and Pooja Patel.</Text>
      <Text style={styles.text}>Technologies used:</Text>
      <Text style={styles.text}>- Google Colab (Model Training)</Text>
      <Text style={styles.text}>- Streamlit (Model Backend)</Text>
      <Text style={styles.text}>- React Native (Mobile App)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f8e9',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    color: '#2e7d32',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#1b5e20',
    marginBottom: 10,
  },
});
