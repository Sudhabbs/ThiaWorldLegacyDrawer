import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image,Dimensions } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const { width } = Dimensions.get('window');
const FacileGoldSchemePage = () => {
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
        <Text style={styles.title}>*Our New* {"\n"} Facile Gold Scheme</Text>
        <Text style={styles.subtitle}>
          Ignite Your Style With Exquisite Gold Jewelry, Now Within Reach!
        </Text>
        <Text style={styles.content}>
          Welcome to Thiaworld Jewellery, a subsidiary company of BBSOCEAN Online Shopping. We are dedicated to providing you with an effortless and secure way to own your desired gold jewelry through our Facile Gold Scheme. Our scheme offers a range of benefits and flexible payment options, ensuring a seamless experience for our customers.
        </Text>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>1. Browse And Select:</Text> Explore our extensive collection of exquisite gold jewelry designs on our user-friendly website. From necklaces and bracelets to earrings and rings, you’ll find a diverse range of styles to suit your taste.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>2. Initial Payment:</Text> Secure your chosen gold jewelry piece by making an upfront payment of only 40% of the total purchase value. This initial payment allows you to reserve the item and proceed with the purchase.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>3. Pledge And Transfer:</Text> Once the initial payment is made, we pledge the jewelry on reputed banks in your name, ensuring maximum security and transparency. The remaining balance is to be paid to Thiaworld Jewellery. We provide flexible payment options for settling the outstanding balance, allowing you to manage your payments with ease and convenience.
        </Text>
        <Text style={styles.sectionTitle}>Flexible Payment Options</Text>
        <Text style={styles.content}>
          We understand the importance of flexibility when it comes to managing your finances. That’s why we offer easy installment options, allowing you to pay off the remaining balance at your convenience. You can choose from weekly, monthly, quarterly, or customized installment plans that suit your financial capabilities.
        </Text>
        <Text style={styles.sectionTitle}>Benefits For Customers</Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Partial Payment:</Text> By paying just 40% of the total jewelry value upfront, you can own and enjoy your desired piece without the need for a substantial initial investment.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Simplified Documentation:</Text> We believe in making the process hassle-free for our customers. With the Facile Gold Scheme, there is no requirement for complex income proofs or income tax returns (ITR). A valid ID proof and PAN card are sufficient to complete the transaction.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Secure Investment:</Text> Rest assured that your investment is protected. Our jewelry comes with BIS certification, guaranteeing its quality and authenticity. Additionally, the jewelry is pledged in your name with reputed banks, providing an extra layer of security and peace of mind.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.bold}>Flexible Installments:</Text> Our flexible installment options allow you to manage your budget effectively. You can choose the installment frequency that aligns with your financial situation, ensuring a comfortable payment process.
        </Text>
        <Text style={styles.content}>
          Invest in our Facile Gold Scheme, a service brought to you by Thiaworld Jewellery, a subsidiary company of BBSOCEAN Online Shopping. Experience the convenience and security of owning exquisite gold jewelry. Visit our website to explore our stunning collection and embark on a journey of timeless elegance and financial empowerment.
        </Text>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default FacileGoldSchemePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
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
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
});
