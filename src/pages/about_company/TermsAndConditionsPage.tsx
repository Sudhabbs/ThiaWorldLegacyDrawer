import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions  } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const { width } = Dimensions.get('window');
const TermsAndConditionsPage = () => {
  return (
    <View style={styles.container}>
        <Header/>
      {/* <Header title="Terms & Conditions" /> */}
      <ScrollView>
      <View style={styles.logoContainer}>
          <Image 
            source={require('./../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" // Maintains the aspect ratio
          />
        </View>
        {/* <Text style={styles.pageTitle}>Terms and Conditions</Text> */}
        <View style={styles.textContainer}>
          <Text>Please read the following Terms of Use carefully before using our website (https://thiaworld.com) or engaging in any transactions with Thiaworld Jewellery (a subsidiary of BBSOCEAN Online Shopping). By accessing or using our services, you agree to comply with these terms and conditions.
          </Text>
          <Text style={styles.title}>Acceptance of Terms</Text>
        <Text style={styles.content}>
        By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use, as well as any additional terms and conditions, policies, or guidelines referenced herein.
        </Text>
        <Text style={styles.content}>
        If you do not agree to these terms, please refrain from using our website and services.
        </Text>
        <Text style={styles.title}>Eligibility</Text>
        <Text style={styles.content}>
        Our website and services are intended for individuals who are at least 18 years old or the legal age of majority in their jurisdiction.
        </Text>
        <Text style={styles.content}>
        By accessing or using our website, you represent and warrant that you meet the eligibility criteria and have the legal capacity to enter into these Terms of Use.
        </Text>
        <Text style={styles.title}>Use of the Website</Text>
        <Text style={styles.content}>
        You may use our website for personal and non-commercial purposes in compliance with these Terms of Use.
        </Text>
        <Text style={styles.content}>
        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </Text>
        <Text style={styles.content}>
        You agree to provide accurate, current, and complete information when creating an account and to update your information as necessary.
        </Text>
        <Text style={styles.title}>Intellectual Property</Text>
        <Text style={styles.content}>
        All content, materials, and designs on our website, including but not limited to text, graphics, logos, images, icons, videos, and software, are the property of Thiaworld Jewellery and are protected by intellectual property laws.
        </Text>
        <Text style={styles.content}>
        You may not reproduce, modify, distribute, transmit, display, perform, or otherwise use any content from our website without our prior written consent.
        </Text>
        <Text style={styles.title}>Product Information</Text>
        <Text style={styles.content}>
        We strive to provide accurate and up-to-date product information on our website. However, we do not warrant or guarantee the accuracy, completeness, or reliability of any product descriptions, prices, or availability.
        </Text>
        <Text style={styles.content}>
        The colors, sizes, and dimensions of the products may vary slightly from the images displayed on our website due to factors such as screen settings and manufacturing processes.
        </Text>
        <Text style={styles.title}>Ordering and Transactions</Text>
        <Text style={styles.content}>
        By placing an order through our website, you make an offer to purchase the selected products subject to these Terms of Use.
        </Text>
        <Text style={styles.content}>
        We reserve the right to accept or reject your order at our discretion. If we are unable to fulfill your order, we will notify you and provide a refund if applicable.
        </Text>
        <Text style={styles.content}>
        Prices, promotions, and discounts displayed on our website are subject to change without notice.
        </Text>
        <Text style={styles.content}>
        You are responsible for providing accurate and complete billing and shipping information. We are not liable for any delays or non-delivery resulting from inaccurate or incomplete information provided by you.
        </Text>
        <Text style={styles.title}>Payment</Text>
        <Text style={styles.content}>
        Payment for orders must be made using the provided payment methods.
        </Text>
        <Text style={styles.content}>
        We take reasonable measures to ensure the security of your payment information, but we do not store or have access to your complete payment details.
        </Text>
        <Text style={styles.title}>Shipping and Delivery</Text>
        <Text style={styles.content}>
        We will make reasonable efforts to deliver your products within the estimated timeframe. However, delivery times may vary depending on factors beyond our control, such as shipping carrier delays or customs procedures.
        </Text>
        <Text style={styles.content}>
        Risk of loss and title for the products pass to you upon our delivery to the shipping carrier. We are not responsible for any loss, damage, or delay during shipping.
        </Text>
        <Text style={styles.title}>Returns and Refunds</Text>
        <Text style={styles.content}>
        Our returns and refunds policy is outlined separately on our website. By purchasing from us, you agree to comply with the applicable policy.
        </Text>
        <Text style={styles.title}>Third-Party Links</Text>
        <Text style={styles.content}>
        Our website may contain links to third-party websites or resources. These links are provided for your convenience, but we do not endorse, control, or have any responsibility
        </Text>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default TermsAndConditionsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20, // Adjusted font size for title
    // fontWeight: 'bold',
    marginVertical: 10,
    // padding: 10,
    color: 'gold', // Darker color for better contrast
  },
  content: {
    fontSize: 16,
    paddingBottom: 20,
    textAlign: 'justify', // Align text to justify for better readability
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    color: 'brown',
  },
  textContainer: {
    padding: 20,
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
});
