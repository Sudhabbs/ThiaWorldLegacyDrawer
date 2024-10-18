import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView ,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const BecomeaVendorScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Function to navigate to Email Verification Page
  const handleRegister = () => {
    navigation.navigate('EmailVerificationPage'); // Navigate to the Email Verification page
  };

  return (
    <View style={styles.container}>
      <Header title="Become a Vendor" />
      <ScrollView style={styles.contentContainer}>
      <View style={styles.logoContainer}>
          <Image 
            source={require('./../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" // Maintains the aspect ratio
          />
        </View>
        <Text style={styles.infoText}>
          Join our platform as a vendor and reach more customers with your products.
        </Text>
        <Text style={styles.additionalInfoText}>
          As a vendor, you can showcase your products to a wider audience and increase your sales. 
          Our platform provides you with all the tools you need to manage your inventory, process 
          orders, and communicate with your customers effectively. 
        </Text>
        <Text style={styles.additionalInfoText}>
          We are committed to providing you with a seamless experience, from registration to 
          fulfilling orders. 
        </Text>
        <Text style={styles.additionalInfoText}>
          Registering as a vendor is easy! Simply fill out the registration form and submit 
          your details. After that, you will receive a verification email to activate your 
          vendor account.
        </Text>
        <Button title="Register as Vendor" onPress={handleRegister} />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default BecomeaVendorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  infoText: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold', // Added bold for emphasis
  },
  additionalInfoText: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center', // Center the logo
  },
  logo: {
    width: 320 * 0.8, // Logo takes 80% of the screen width
    height: undefined, // Maintain aspect ratio
    aspectRatio: 1, // Use an aspect ratio for responsiveness
  },
});
