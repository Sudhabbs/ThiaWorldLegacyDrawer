import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const { width } = Dimensions.get('window');

const CancellationPolicyPage = () => {
  return (
    <View style={styles.container}>
      <Header/>
      {/* <Header title="Privacy Policy" /> */}
      <ScrollView style={styles.contentContainer}>
      <View style={styles.logoContainer}>
          <Image 
            source={require('./../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain" // Maintains the aspect ratio
          />
        </View>
        
        <Text style={styles.content}>
        At Thiaworld Jewellery(a subsidiary of BBSOCEAN Online Shopping), we strive to provide you with the best shopping experience. We understand that circumstances may arise where you need to cancel your order. Please review our cancellation policy below:
        </Text>
        <Text style={styles.title}>Standard Products:</Text>
        <Text style={styles.content}>
        If you wish to cancel an order for a standard product before it has been shipped, please contact our customer support team as soon as possible. We will make every effort to accommodate your request.
      </Text>
        <Text style={styles.content}>
        If the order has already been shipped, we cannot cancel it. In such cases, you may refer to our Returns and Refunds policy for further instructions.
        </Text>
        <Text style={styles.title}>Customized Products:</Text>
        <Text style={styles.content}>
        Please note that customized products, including personalized or made-to-order items, are specially crafted according to your specifications and are unique to you.
        </Text>
        <Text style={styles.content}>
        Once you have placed an order for a customized product, cancellations are generally not accepted as production begins promptly to ensure timely delivery of your personalized item.
        </Text>
        <Text style={styles.content}>
        However, if you receive a customized product that is defective or damaged during shipping, please contact our customer support team immediately, and we will assist you with the appropriate solution.
        </Text>
        <Text style={styles.title}>Defective or Damaged Products:</Text>
        <Text style={styles.content}>
        If you receive a defective or damaged product, regardless of whether it is standard or customized, please notify us within 7 days of receiving the item.
        </Text>
        <Text style={styles.content}>
        To initiate a return or exchange for a defective or damaged product, please contact our customer support team and provide them with the necessary details and supporting documentation (such as photographs).
        </Text>
        <Text style={styles.content}>
        We will evaluate the issue and, if deemed valid, offer a replacement, repair, or refund as per our Returns and Refunds policy.
        </Text>
        <Text style={styles.title}>Changes to Orders:</Text>
        <Text style={styles.content}>
        Please review your order carefully before completing the checkout process.
        </Text>
        <Text style={styles.content}>
        Once an order is placed, we cannot guarantee that changes can be made to the order details, including product specifications, personalization, or shipping information.
        </Text>
        <Text style={styles.content}>
        If you need to make changes to your order, please contact our customer support team as soon as possible, and we will do our best to accommodate your request.
        </Text>
        <Text style={styles.title}>Exceptions:</Text>
        <Text style={styles.content}>
        In exceptional circumstances or at our discretion, we may consider cancellations or modifications to orders that fall outside the standard cancellation policy. However, such cases will be handled on a case-by-case basis, and any decision made will be final.
        </Text>
        <Text style={styles.title}>Communication and Refunds:</Text>
        <Text style={styles.content}>
        All cancellation requests must be made in writing or via email to our customer support team.
        </Text>
        <Text style={styles.content}>
        If your cancellation request is approved, we will refund the purchase amount to the original payment method used for the transaction. Please allow a reasonable processing time for the refund to be completed.
        </Text>
        <Text style={styles.content}>
        We reserve the right to modify or update this cancellation policy at any time. Please refer to the latest version available on our website or contact our customer support team for any clarifications or inquiries regarding order cancellations.
        </Text> 
        <Text style={styles.content}>
        Note: This cancellation policy is specific to Thiaworld Jewellery and may not apply to third-party sellers or marketplaces where our products are available. Please refer to the respective cancellation policies of those platforms when making purchases.
        </Text>
      
        {/* Add more sections of the privacy policy here */}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default CancellationPolicyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  paragraph: {
    marginBottom: 15,
    fontSize: 16,
    lineHeight: 24,
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
  // title: {
  //   fontSize: 24, // Adjusted font size for title
  //   fontWeight: 'bold',
  //   marginVertical: 10,
  //   padding: 10,
  //   color: '#333', // Darker color for better contrast
  // },
  // content: {
  //   fontSize: 16,
  //   paddingBottom: 20,
  //   textAlign: 'justify', // Align text to justify for better readability
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
    paddingBottom: 20,
    textAlign: 'justify', // Align text to justify for better readability
  },
  link: {
    color: 'purple', // Set link color to purple
    textDecorationLine: 'underline', // Optional: underline for link style
},
});
