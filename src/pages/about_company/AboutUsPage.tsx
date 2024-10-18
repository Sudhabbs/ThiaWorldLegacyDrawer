import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AboutUsPage = () => {
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
       
        <Text style={styles.content}>
        Welcome to Thiaworld Jewellery, your go-to destination for affordable, high-quality Jewellery online! As a proud subsidiary of BBSOCEAN Online Shopping, we’re dedicated to offering an extensive selection of stunning Jewellery pieces suited for every occasion.
        </Text>
        <Text style={styles.title}>Explore Our Collection:</Text>
        <Text style={styles.content}>
        Discover a wide range of Jewellery options, including engagement rings, wedding bands, necklaces, earrings, bracelets, and more. Each piece is meticulously crafted to ensure both beauty and durability.
        </Text>
        <Text style={styles.title}>What Makes Us Different:</Text>
        <Text style={styles.content}>

        <View style={styles.pointContainer}>
        <Text style={styles.point}>
          1. <Text style={styles.bold}>Extensive Variety:</Text> We take pride in curating a diverse collection of Jewellery, ensuring there’s something for every taste and style preference.
        </Text>
        <Text style={styles.point}>
          2. <Text style={styles.bold}>Affordable Luxury:</Text> Enjoy luxury without breaking the bank. Our competitive prices make it easy to indulge in elegant Jewellery pieces without compromise.
        </Text>
        <Text style={styles.point}>
          3. <Text style={styles.bold}>User-Friendly Experience:</Text> Our website is designed to provide a seamless shopping experience, allowing you to browse and purchase your favorite pieces with ease.
        </Text>
        <Text style={styles.point}>
          4. <Text style={styles.bold}>Convenient Services:</Text> Benefit from our customer-centric services, including free shipping, hassle-free returns, and a satisfaction guarantee. Your happiness is our top priority.
        </Text>
      </View>
        </Text>
        <Text style={styles.title}>Why Choose Thiaworld Jewellery:</Text>
        <Text style={styles.content}>
        At Thiaworld Jewellery, we’re committed to providing an exceptional shopping experience tailored to your needs. Whether you’re searching for the perfect gift or treating yourself to something special, we’re here to assist you every step of the way.
        </Text>
        <Text style={styles.title}>Get in Touch:</Text>
        <Text style={styles.content}>
        Questions or need assistance? Our dedicated customer support team is readily available to help you find the ideal Jewellery piece to suit your needs and preferences.
        </Text>
        <Text style={styles.title}>Shop with Confidence:</Text>
        <Text style={styles.content}>
        Shop with confidence knowing that each Thiaworld Jewellery piece is crafted with care and backed by our commitment to quality and customer satisfaction.
        </Text>
        <Text style={styles.title}>Conclusion:</Text>
        <Text style={styles.content}>
        Elevate your style and celebrate life’s moments with exquisite Jewellery from Thiaworld Jewellery. Explore our collection today and find the perfect accessory to adorn yourself or someone special.
        </Text>
      </ScrollView>
      <Footer />
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
    // alignItems: 'center', // Center content
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center', // Center the logo
  },
  pointContainer: {
    marginBottom: 16,
  },
  point: {
    fontSize: 14,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  logo: {
    width: width * 0.8, // Logo takes 80% of the screen width
    height: undefined, // Maintain aspect ratio
    aspectRatio: 1, // Use an aspect ratio for responsiveness
  },
  // title: {
  //   fontSize: 24, // Adjusted font size for title
  //   fontWeight: 'bold',
  //   marginVertical: 10,
  //   padding: 10,
  //   color: '#333', // Darker color for better contrast
  // },
  title: {
    fontSize: 20, // Adjusted font size for title
    // fontWeight: 'bold',
    marginVertical: 10,
    // padding: 10,
    color: 'gold', // Darker color for better contrast
  },
  content: {
    fontSize: 16,
    padding: 10,
    textAlign: 'justify', // Align text to justify for better readability
  },
});
