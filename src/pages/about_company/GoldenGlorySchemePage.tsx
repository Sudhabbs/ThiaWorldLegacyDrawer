import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image,Dimensions } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const { width } = Dimensions.get('window');
const GoldenGlorySchemePage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.logoContainer}>
          <Image 
            source={require('./../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" // Maintains the aspect ratio
          />
        </View>
        <Text style={styles.title}>*Our New*{"\n"}Golden Glory Scheme</Text>
        <Text style={styles.subtitle}>
          Elevate Elegance, Seize Opportunity!
        </Text>
        <Text style={styles.content}>
          Welcome to Thiaworld Jewellery, a subsidiary company of BBSOCEAN Online Shopping. We are dedicated to providing you with an effortless and secure way to own your desired gold jewelry.
        </Text>
        <Text style={styles.content}>
          We take pride in introducing our extraordinary program, the Golden Glory Scheme, at our establishment.
        </Text>
        
        <Text style={styles.sectionTitle}>Benefits For Customers</Text>
        
        <Text style={styles.benefitTitle}>1. Selection</Text>
        <Text style={styles.content}>
          A group of 10 individuals will embark on this exclusive journey.
        </Text>

        <Text style={styles.benefitTitle}>2. Contribution</Text>
        <Text style={styles.content}>
          Each member contributes towards the chosen amount after their selection.
        </Text>

        <Text style={styles.benefitTitle}>3. Monthly Processing</Text>
        <Text style={styles.content}>
          On the agreed-upon date, the group’s monthly offerings are processed.
        </Text>

        <Text style={styles.benefitTitle}>4. Lottery Win</Text>
        <Text style={styles.content}>
          A fortunate member is chosen by lottery each month, with their name added to the prestigious list.
        </Text>

        <Text style={styles.benefitTitle}>5. Gifts For All</Text>
        <Text style={styles.content}>
          As a gesture of gratitude, gifts are bestowed upon the remaining 9 individuals.
        </Text>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default GoldenGlorySchemePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center', // Center the logo
  },
  logo: {
    width: 400 * 0.8, // Logo takes 80% of the screen width
    height: undefined, // Maintain aspect ratio
    aspectRatio: 1, // Use an aspect ratio for responsiveness
  },
  scrollContainer: {
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#a57200', // Gold color
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 8,
    color: '#555',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#a57200', // Gold color
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#a57200', // Gold color
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
    color: '#333',
  },
});
