import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';

const CheckoutPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { shippingDetails, totalPrice } = route.params; // Get shipping details and total price from route params

  const [isAgreed, setIsAgreed] = useState(false); // State to manage agreement checkbox

  const handleCheckout = () => {
    if (!isAgreed) {
      Alert.alert('Error', 'Please agree to the terms and conditions to proceed.');
      return;
    }

    // Proceed to the Payment Page
    navigation.navigate('PaymentPage', { totalPrice, shippingDetails });
  };

  const navigateToTerms = () => {
    navigation.navigate('TermsAndConditionsPage'); // Navigate to Terms and Conditions page
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Checkout</Text>

        {/* Shipping Address Section */}
        <View style={styles.addressContainer}>
          <Text style={styles.subTitle}>Shipping Address</Text>
          <Text>Name: {shippingDetails.fullName}</Text>
          <Text>Address: {shippingDetails.shippingAddress}</Text>
          <Text>City: {shippingDetails.city}</Text>
          <Text>State: {shippingDetails.state}</Text>
          <Text>Zip Code: {shippingDetails.zipCode}</Text>
          <Text>Phone: {shippingDetails.phoneNumber}</Text>
          <Text>Email: {shippingDetails.email}</Text>
        </View>

        {/* Agreement Section */}
        <View style={styles.agreementContainer}>
          <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)} style={styles.checkbox}>
            <View style={isAgreed ? styles.checked : styles.unchecked} />
            <Text style={styles.agreementText}>I agree to the </Text>
            <TouchableOpacity onPress={navigateToTerms}>
              <Text style={styles.linkText}>terms and conditions</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {/* Checkout Button */}
        <Button title="Proceed to Payment" onPress={handleCheckout} color="#f76c6c" />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default CheckoutPage;

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
    padding: 10,
    color: '#333',
    textAlign: 'center',
  },
  addressContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checked: {
    width: 20,
    height: 20,
    backgroundColor: '#007bff',
    borderRadius: 3,
  },
  unchecked: {
    width: 20,
    height: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 3,
  },
  agreementText: {
    marginLeft: 10,
  },
  linkText: {
    color: '#007bff', // Link color
    textDecorationLine: 'underline',
  },
});
