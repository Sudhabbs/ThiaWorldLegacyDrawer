import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { width } = Dimensions.get('window');

const ShippingPolicyPage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* <Text style={styles.heading}>Shipping Policy</Text> */}

        <Text style={styles.content}>
          At Thiaworld Jewellery (a subsidiary of BBSOCEAN Online Shopping), we are dedicated to providing a hassle-free and reliable shipping experience for our customers. Please read our comprehensive shipping policy below for more information. All goods will be fully insured by BBSOCEAN Online Shopping (https://thiaworld.com) until they reach you, so your purchase is 100% safe.
        </Text>

        <Text style={styles.subtitle}>Shipping Locations:</Text>
        <Text style={styles.content}>
          We currently offer shipping only to addresses within India.
        </Text>

        <Text style={styles.subtitle}>Shipping Methods:</Text>
        <Text style={styles.content}>
          To ensure timely and secure delivery of your orders, we partner with reputable shipping carriers. The available shipping methods and carriers may vary depending on your location and the nature of the products ordered. You will be able to select your preferred shipping method during the checkout process.
        </Text>

        <Text style={styles.subtitle}>Processing Time:</Text>
        <Text style={styles.content}>
          We strive to process and dispatch orders as quickly as possible. However, the processing time for each order may vary depending on factors such as product availability, customization requirements, and order volume. You can refer to the product pages or your order confirmation for an estimated processing time.
        </Text>

        <Text style={styles.subtitle}>Time to Deliver:</Text>
        <Text style={styles.content}>
          The time taken for delivery varies depending on the destination. However, we make every effort to ensure that your order is delivered on time.
        </Text>

        <Text style={styles.subtitle}>Delivery Time for Domestic Orders:</Text>
        <Text style={styles.content}>
          For orders within India, the product is typically delivered within 7-10 working days from the day of order confirmation, provided there is no delay by any governmental authority or any other entity acting on behalf of the government or acting as per the directions of the government. If we are unable to deliver your order within the stipulated period, we will cancel the order and notify you accordingly. In such cases, the refund will be made directly to your account via the same mode through which the payment was made. To ensure that the products reach you promptly and in perfect condition, we only partner with reputed courier agencies. We also require identity proof for verification of the recipient.
        </Text>

        <Text style={styles.subtitle}>Express Delivery Description:</Text>
        <Text style={styles.content}>
          Our Express Delivery service is currently accessible for designated products and specific pin codes within the cities of Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Kolkata, Ahmedabad, Pune, Kochi, Jaipur. If an order is placed before 2 PM, the product will be delivered within 7-10 working days. However, orders placed after 2 PM will observe a 15 days delivery timeframe. For all other pin codes, the standard domestic delivery period of 7-10 working days will be maintained. Kindly note that Express Delivery is not applicable to international orders.
        </Text>

        <Text style={styles.subtitle}>Recipient ID Verification:</Text>
        <Text style={styles.content}>
          PLEASE NOTE: Recipients need to produce any of the following government-issued photo identity proof for receiving the delivery: Pan card, Driving License, Passport, Voter identification card, Postal identification Card (Aadhar). For orders above Rs 2 lakhs, customers need to provide a PAN card. If the PAN card is not available, Form 60 will be given to the customer, which should be filled and signed.
        </Text>

        <Text style={styles.subtitle}>Undeliverable Packages:</Text>
        <Text style={styles.content}>
          If a package is deemed undeliverable by the shipping carrier, it will be returned to us. In such cases, we will contact you to arrange for re-shipment, subject to additional shipping charges, or provide a refund minus the shipping costs and any applicable fees incurred.
        </Text>

        <Text style={styles.subtitle}>Shipping Policy Updates:</Text>
        <Text style={styles.content}>
          Please note that our shipping policy may be subject to change without prior notice. It is recommended that you refer to the latest version available on our website or contact our customer support team for any clarifications or inquiries regarding shipping-related matters.
        </Text>

        <Text style={styles.subtitle}>Transit Insurance:</Text>
        <Text style={styles.content}>
          All goods will be fully insured by BBSOCEAN Online Shopping (https://thiaworld.com) until they reach you, so your purchase is 100% safe.
        </Text>

        <Text style={styles.subtitle}>Contact Us:</Text>
        <Text style={styles.content}>
          For any customer assistance, you can call our office number +91 413 406 8916 or write to info@thiaworld.com. Our customer support team is available to help you with any shipping-related queries or concerns.
        </Text>

        <Text style={styles.thankyou}>
          Thank you for choosing Thiaworld Jewellery for your jewelry needs. We strive to provide you with a seamless and enjoyable shopping experience. We value your opinion and are always looking for ways to improve our services.
        </Text>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ShippingPolicyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: undefined,
    aspectRatio: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
    marginBottom: 15,
  },
  thankyou: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#d4af37',
  },
});
