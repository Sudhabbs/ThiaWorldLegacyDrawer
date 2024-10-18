import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRoute } from '@react-navigation/native';

const PaymentPage = () => {
  const route = useRoute();
  const { totalPrice, shippingDetails, loyaltyPointsAvailable } = route.params; // Retrieve data including loyalty points

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loyaltyPointsUsed, setLoyaltyPointsUsed] = useState('');

  const handlePayment = () => {
    if (selectedPaymentMethod === 'Loyalty Points') {
      if (!loyaltyPointsUsed || Number(loyaltyPointsUsed) > loyaltyPointsAvailable) {
        Alert.alert('Error', 'Please enter valid loyalty points.');
        return;
      }
    } else if (selectedPaymentMethod === 'UPI') {
      if (!upiId) {
        Alert.alert('Error', 'Please enter your UPI ID.');
        return;
      }
    } else if (selectedPaymentMethod === 'Credit/Debit Card') {
      if (!cardNumber || !expirationDate || !cvv) {
        Alert.alert('Error', 'Please fill all card details.');
        return;
      }
      if (cardNumber.length < 16 || cardNumber.length > 19) {
        Alert.alert('Error', 'Please enter a valid card number.');
        return;
      }
      const [month, year] = expirationDate.split('/');
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear() % 100;
      if (month < 1 || month > 12 || year < currentYear) {
        Alert.alert('Error', 'Please enter a valid expiration date.');
        return;
      }
      if (cvv.length < 3 || cvv.length > 4) {
        Alert.alert('Error', 'Please enter a valid CVV.');
        return;
      }
    }

    // Proceed with payment processing logic
    console.log(`Payment method: ${selectedPaymentMethod}`);
    if (selectedPaymentMethod === 'Loyalty Points') {
      console.log(`Loyalty Points Used: ${loyaltyPointsUsed}`);
    } else if (selectedPaymentMethod === 'UPI') {
      console.log(`UPI ID: ${upiId}`);
    } else if (selectedPaymentMethod === 'Credit/Debit Card') {
      console.log(`Card Number: ${cardNumber}`);
      console.log(`Expiration Date: ${expirationDate}`);
      console.log(`CVV: ${cvv}`);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Payment</Text>
        <Text style={styles.subTitle}>Total Amount: ${totalPrice.toFixed(2)}</Text>

        {/* Payment Method Section */}
        <Text style={styles.subTitle}>Select Payment Method:</Text>
        <TouchableOpacity style={styles.paymentOption} onPress={() => setSelectedPaymentMethod('Credit/Debit Card')}>
          <Text style={styles.paymentText}>Credit/Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption} onPress={() => setSelectedPaymentMethod('UPI')}>
          <Text style={styles.paymentText}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption} onPress={() => setSelectedPaymentMethod('Cash on Delivery')}>
          <Text style={styles.paymentText}>Cash on Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption} onPress={() => setSelectedPaymentMethod('CC Avenue')}>
          <Text style={styles.paymentText}>CC Avenue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentOption} onPress={() => setSelectedPaymentMethod('RubyPay')}>
          <Text style={styles.paymentText}>RubyPay</Text>
        </TouchableOpacity>

        {/* Conditionally Render Loyalty Points Option */}
        {loyaltyPointsAvailable > 0 && (
          <TouchableOpacity style={styles.paymentOption} onPress={() => setSelectedPaymentMethod('Loyalty Points')}>
            <Text style={styles.paymentText}>Loyalty Points (Available: {loyaltyPointsAvailable})</Text>
          </TouchableOpacity>
        )}

        {/* UPI Input Field */}
        {selectedPaymentMethod === 'UPI' && (
          <>
            <Text style={styles.subTitle}>Enter UPI ID:</Text>
            <TextInput
              placeholder="UPI ID"
              style={styles.input}
              value={upiId}
              onChangeText={setUpiId}
            />
          </>
        )}

        {/* Card Details Input */}
        {selectedPaymentMethod === 'Credit/Debit Card' && (
          <>
            <Text style={styles.subTitle}>Card Details:</Text>
            <TextInput
              placeholder="Card Number"
              style={styles.input}
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
            />
            <TextInput
              placeholder="Expiration Date (MM/YY)"
              style={styles.input}
              keyboardType="numeric"
              value={expirationDate}
              onChangeText={setExpirationDate}
            />
            <TextInput
              placeholder="CVV"
              style={styles.input}
              secureTextEntry={true}
              keyboardType="numeric"
              value={cvv}
              onChangeText={setCvv}
            />
          </>
        )}

        {/* Loyalty Points Input */}
        {selectedPaymentMethod === 'Loyalty Points' && (
          <>
            <Text style={styles.subTitle}>Enter Loyalty Points to Use:</Text>
            <TextInput
              placeholder="Loyalty Points"
              style={styles.input}
              keyboardType="numeric"
              value={loyaltyPointsUsed}
              onChangeText={setLoyaltyPointsUsed}
            />
          </>
        )}

        <Button title="Proceed to Payment" onPress={handlePayment} color="#f76c6c" />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default PaymentPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  paymentOption: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
});
