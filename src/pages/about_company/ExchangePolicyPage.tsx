import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const { width } = Dimensions.get('window');

const ExchangePolicyPage = () => {
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
        At Thiaworld Online Jewellery (a subsidiary of BBSOCEAN Online Shopping), we want you to be completely satisfied with your purchase. We understand that there may be instances where you would like to exchange a product. Please review our comprehensive exchange policy below:
        </Text>
        <Text style={styles.title}>Eligibility for Exchange:</Text>
        <Text style={styles.content}>
        Products are eligible for exchange if they meet the following criteria:
      </Text>
        <Text style={styles.content}>
        The product is in its original condition, unused, and undamaged.
        </Text>
        <Text style={styles.content}>
        The product is accompanied by the original packaging, tags, and certificates, if applicable.
        </Text>
        <Text style={styles.content}>
        The request for an exchange is made within [insert number of days] of receiving the product.
        </Text>
        <Text style={styles.title}>Exclusions:</Text>
        <Text style={styles.content}>
        The following items are not eligible for exchange:
        </Text>
        <Text style={styles.content}>
        Customized products that have been personalized or made-to-order, unless there is a manufacturing defect.
        </Text>
        <Text style={styles.content}>
        Products that have been damaged or altered by the customer.
        </Text>
        <Text style={styles.content}>
        Earrings (for hygiene reasons), unless they are defective or damaged upon arrival.
        </Text>
        <Text style={styles.title}>Exchange Process:</Text>
        <Text style={styles.content}>
        To request an exchange, please contact our customer support team within the specified timeframe.
        </Text>
        <Text style={styles.content}>
        Provide them with your order details, the reason for the exchange, and any supporting documentation or photographs, if applicable.
        </Text>
        <Text style={styles.content}>
        Our customer support team will guide you through the exchange process and provide you with the necessary instructions.
        </Text>
        <Text style={styles.title}>Exchange Options:</Text>
        <Text style={styles.content}>
        Upon receiving your exchange request, we will assess the eligibility of the product for exchange.
        </Text>
        <Text style={styles.content}>
        If the product meets the exchange criteria, you will be provided with the following options:
        </Text>
        <Text style={styles.content}>
        Exchange for a different product of equal or lesser value.
        </Text>
        <Text style={styles.content}>
        Exchange for a different size, color, or variant of the same product, if applicable.
        </Text>
       
        <Text style={styles.content}>
        Exchange for store credit that can be used towards a future purchase.
        </Text>
        <Text style={styles.content}>
        In the case of a defective or damaged product, we may offer a replacement of the same product, subject to availability.
        </Text>
        <Text style={styles.title}>Exchange Shipping:</Text>
        <Text style={styles.content}>
        The customer is responsible for the shipping costs associated with the exchange, including the return of the original product and the shipment of the exchanged product.
        </Text>
        <Text style={styles.content}>
        Please ensure that the exchanged product is securely packaged to prevent damage during transit.
        </Text>
        <Text style={styles.content}>
        We recommend using a reliable shipping service with tracking and insurance for the returned package. Thiaworld Online Jewellery is not responsible for any lost or damaged packages during the return shipping process.
        </Text>
        <Text style={styles.title}>Product Evaluation:</Text>
        <Text style={styles.content}>
        Upon receiving the returned product, we will inspect it to ensure that it meets the exchange criteria.
        </Text>
        <Text style={styles.content}>
        If the product is found to be in satisfactory condition, we will proceed with the exchange as agreed upon.
        </Text>
        <Text style={styles.content}>
        If the product does not meet the exchange criteria, we will contact you to discuss the available options.
        </Text>
        <Text style={styles.title}>Exchange Confirmation:</Text>
        <Text style={styles.content}>
        Once the exchange is approved and processed, you will receive confirmation via email or other appropriate means.
        </Text>
        <Text style={styles.content}>
        Any price difference between the original product and the exchanged product, including applicable taxes and shipping charges, will be handled accordingly. You may be required to make an additional payment or receive a partial refund, as applicable.
        </Text>
        <Text style={styles.title}>Additional Terms:</Text>
        <Text style={styles.content}>
        The exchange policy applies only to purchases made directly from Thiaworld Online Jewellery. For products purchased from third-party sellers or marketplaces, please refer to their respective exchange policies.
        </Text>
        <Text style={styles.content}>
        The exchange policy may be subject to change without prior notice. Please refer to the latest version available on our website or contact our customer support team for any clarifications or inquiries regarding exchanges.
        </Text>
        <Text style={styles.content}>
        Please ensure that you thoroughly review and understand our exchange policy before initiating an exchange request. If you have any questions or require further assistance, please contact our customer support team, and we will be happy to assist you.
        </Text>
        {/* Add more sections of the privacy policy here */}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ExchangePolicyPage;

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
