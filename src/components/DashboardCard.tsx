import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardCard = ({ title, value }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardValue}>{value}</Text>
    </View>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    alignItems: 'center', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // For Android shadow effect
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 24,
    color: '#007BFF',
  },
});
