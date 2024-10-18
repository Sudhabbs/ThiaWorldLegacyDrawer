import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Aboutus = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About ThiaWorld</Text>
      <Text style={styles.description}>This is the about page of ThiaWorld.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Aboutus;
