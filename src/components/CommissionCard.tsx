import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommissionCard = ({ customer, totalSales, commission1, commission2 ,transactionDate}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.customerName}>{customer}</Text>
      <Text style={styles.sales}>Total Sales: {totalSales}</Text>
      <Text style={styles.commission}>{commission1}</Text>
      <Text style={styles.commission}>{commission2}</Text>
      <Text style={styles.commission}>{transactionDate}</Text>
    </View>
  );
};

export default CommissionCard;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sales: {
    fontSize: 16,
    marginVertical: 5,
  },
  commission: {
    fontSize: 14,
    color: '#555',
  },
});
