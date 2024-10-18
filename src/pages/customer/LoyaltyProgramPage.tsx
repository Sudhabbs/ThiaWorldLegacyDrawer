import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const LoyaltyProgramPage = ({ route }) => {
  const { points = 0 } = route.params || {};
  const navigation = useNavigation(); // Initialize navigation

  const productData = [
    { id: 1, name: 'Product 1', earnedPoints: 200, balancePoints: 0, usedPoints: 200, wastedPoints: 0, expiryDate: '2024-10-01', redemptionCode: 'CODE123' },
    { id: 2, name: 'Product 2', earnedPoints: 400, balancePoints: 0, usedPoints: 200, wastedPoints: 200, expiryDate: '2024-11-01', redemptionCode: 'CODE456' },
    { id: 3, name: 'Product 3', earnedPoints: 300, balancePoints: 300, usedPoints: 0, wastedPoints: 0, expiryDate: '2025-01-15', redemptionCode: 'CODE789' },
    { id: 4, name: 'Product 4', earnedPoints: 500, balancePoints: 500, usedPoints: 0, wastedPoints: 0, expiryDate: '2025-06-30', redemptionCode: 'CODE101' },
    { id: 5, name: 'Product 5', earnedPoints: 500, balancePoints: 300, usedPoints: 200, wastedPoints: 0, expiryDate: '2025-12-31', redemptionCode: 'CODE202' },
  ];

  const [totalPoints, setTotalPoints] = useState(0);
  const [usedPoints, setUsedPoints] = useState(0);
  const [balancePoints, setBalancePoints] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [redemptionCode, setRedemptionCode] = useState('');

  useEffect(() => {
    const totalEarned = productData.reduce((sum, product) => sum + product.earnedPoints, 0);
    const totalUsed = productData.reduce((sum, product) => sum + product.usedPoints, 0);
    const totalWasted = productData.reduce((sum, product) => sum + product.wastedPoints, 0);

    // Balance points is total points earned minus used and wasted points
    const balance = totalEarned - totalUsed - totalWasted;

    setTotalPoints(totalEarned);
    setUsedPoints(totalUsed);
    setBalancePoints(balance);

    const history = productData.map(product => ({
      id: product.id,
      date: new Date().toLocaleDateString(),
      description: `Earned Points from ${product.name}`,
      pointsEarned: product.earnedPoints,
      pointsUsed: product.usedPoints,
      pointsWasted: product.wastedPoints,
      expiryDate: product.expiryDate,
    }));
    setTransactionHistory(history);

    // Calculate total unused points and generate a single redemption code
    const { totalUnusedPoints } = productData.reduce((acc, product) => {
      if (product.balancePoints > 0 && product.expiryDate > new Date().toISOString().split('T')[0]) {
        acc.totalUnusedPoints += product.balancePoints;
      }
      return acc;
    }, { totalUnusedPoints: 0 });

    setRedemptionCode(`REDEEM-${totalUnusedPoints}`); // Generate a single redemption code based on total unused points

  }, []);
  const handleRedeemPoints = () => {
    if (balancePoints > 0) { // Check if there are any unused points
      const totalUnusedPoints = balancePoints; // Total unused points
  
      // Check if there are products with balance points and valid expiry date
      const hasProductsInCart = productData.some(product => 
        product.balancePoints > 0 && 
        new Date(product.expiryDate) > new Date()
      );
  
      if (hasProductsInCart) {
        Alert.alert('Redeem Successful!', `You have redeemed all ${totalUnusedPoints} points. Your redemption code is: ${redemptionCode}`);
  
        // Update state variables
        setBalancePoints(0); // Redeem all unused points
        setUsedPoints(usedPoints + totalUnusedPoints); // Update used points
        setTransactionHistory([...transactionHistory, {
          id: transactionHistory.length + 1,
          date: new Date().toLocaleDateString(),
          description: `Redeemed all ${totalUnusedPoints} points`,
          pointsUsed: totalUnusedPoints,
        }]);
  
        // Pass selected items from your cart or set it accordingly
        const selectedItems = productData.filter(product => 
          product.balancePoints > 0 && 
          new Date(product.expiryDate) > new Date()
        ); // Adjust this to match your actual cart logic
  
        // Only navigate if there are selected items
        if (selectedItems.length > 0) {
          navigation.navigate('ShippingAddressPage', {
            selectedItems: selectedItems, // Pass the selected items here
          });
        } else {
          Alert.alert('No Products', 'Please select any item before proceeding to the shipping page.');
        }
      } else {
        Alert.alert('No Products', 'Please select any item before proceeding to the shipping page.');
      }
    } else {
      Alert.alert('Insufficient Points', `You have no points to redeem.`);
    }
  };
  
  

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <View style={styles.container}>
      <Header title="Loyalty Program" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Points Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Points Summary</Text>
          <Text style={styles.summaryText}>Total Points: {totalPoints}</Text>
          <Text style={styles.summaryText}>Used Points: {usedPoints}</Text>
          <Text style={styles.summaryText}>Balance Points: {balancePoints}</Text>
        </View>

        {/* Redeem Section */}
        <View style={styles.redeemContainer}>
          <Text style={styles.redeemTitle}>Available Products for Redemption</Text>

          {balancePoints > 0 ? ( // Check if there are balance points
            <>
              <TouchableOpacity
                style={styles.redeemButton}
                onPress={handleRedeemPoints}>
                <Text style={styles.redeemText}>Redeem All Points</Text>
                <Text style={styles.redeemText}>Your Redemption Code: {redemptionCode}</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.noPointsText}>You have no points to redeem.</Text> // Message when there are no points
          )}
        </View>

        {/* Transaction History */}
        <View style={styles.transactionContainer}>
          <Text style={styles.transactionTitle}>Transaction History</Text>
          {transactionHistory.map(transaction => (
            <View key={transaction.id} style={styles.transactionItem}>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
              <Text style={styles.transactionDescription}>{transaction.description}</Text>
              {transaction.pointsUsed > 0 && (
                <Text style={styles.transactionPoints}>Points Used: {transaction.pointsUsed}</Text>
              )}
              <Text style={styles.expiryText}>Expiry Date: {transaction.expiryDate}</Text>
            </View>
          ))}
        </View>

        <Footer />
      </ScrollView>
    </View>
  );
};

export default LoyaltyProgramPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollView: {
    padding: 20,
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  redeemContainer: {
    marginBottom: 20,
  },
  redeemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noPointsText: {
    fontSize: 16,
    color: '#ff6f61', // Change this to your preferred color
    textAlign: 'center',
    marginTop: 10,
  },
  redeemButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  redeemText: {
    color: '#fff',
    fontSize: 16,
  },
  expiryText: {
    fontSize: 12,
    color: '#ff6f61',
    marginTop: 5,
  },
  redemptionCodeText: {
    fontSize: 12,
    color: '#007bff',
    marginTop: 5,
  },
  transactionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    marginBottom: 10,
  },
  transactionDate: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#333',
  },
  transactionPoints: {
    fontSize: 14,
    color: '#ff6f61',
  },
});
