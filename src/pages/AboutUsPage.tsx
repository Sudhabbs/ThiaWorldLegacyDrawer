import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
// import Header from '../components/Header';
// import Footer from '../components/Footer';

const AboutUsPage = () => {
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('./../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" // Maintains the aspect ratio
          />
        </View>
        <Text style={styles.title}>Our Story</Text>
        <Text style={styles.content}>
          Welcome to Thiaworld Jewellery, your go-to destination for affordable, high-quality Jewellery online! As a proud subsidiary of BBSOCEAN Online Shopping, we’re dedicated to offering an extensive 
          selection of stunning Jewellery pieces suited for every occasion.
        </Text>
        <Text style={styles.title}>Our Mission</Text>
        <Text style={styles.content}>
          We strive to provide our customers with high-quality jewelry...
        </Text>
        <Text style={styles.title}>Our Values</Text>
        <Text style={styles.content}>
          Integrity, Customer Satisfaction, Sustainability...
        </Text>
      
      </ScrollView>
      {/* <Footer /> */}
    </View>
  );
};

export default AboutUsPage;

const { width } = Dimensions.get('window'); // Get device width for responsiveness

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center', // Center content
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center', // Center the logo
  },
  logo: {
    width: width * 0.8, // Logo takes 80% of the screen width
    height: undefined, // Maintain aspect ratio
    aspectRatio: 1, // Use an aspect ratio for responsiveness
  },
  title: {
    fontSize: 24, // Adjusted font size for title
    fontWeight: 'bold',
    marginVertical: 10,
    padding: 10,
    color: '#333', // Darker color for better contrast
  },
  content: {
    fontSize: 16,
    padding: 10,
    textAlign: 'justify', // Align text to justify for better readability
  },
});
