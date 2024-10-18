import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const { width } = Dimensions.get('window');

const RefundPolicyPage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain" // Keeps aspect ratio
          />
        </View>

        <Text style={styles.content}>
          At Thiaworld Jewellery (a subsidiary of BBSOCEAN Online Shopping), we strive to provide our customers with a seamless and satisfactory shopping experience. We understand that occasionally, you may need to return or seek a refund for your purchase. To ensure transparency and customer satisfaction, we have established the following refund policy:
        </Text>

        <Text style={styles.title}>Eligibility for Refunds:</Text>
        <Text style={styles.content}>
          <Text style={styles.subtitle}>Damaged or Defective Items:</Text> If you receive a damaged or defective piece of jewelry, please notify us within 7 days of delivery. We will arrange for a return and provide a full refund or replacement.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.subtitle}>Wrong Product Received:</Text> In the rare event that you receive the wrong product, please contact us within 7 days of delivery. We will assist you in returning the item and provide a full refund or send the correct item.
        </Text>
        <Text style={styles.content}>
          <Text style={styles.subtitle}>Dissatisfaction with Quality or Appearance:</Text> If you are unsatisfied with the quality or appearance of the jewelry, you may request a return within 7 days of delivery. We will refund the purchase price after inspecting the returned item, provided it is in its original condition and packaging.
        </Text>

        <Text style={styles.title}>Return Process:</Text>
        <Text style={styles.content}>
          To initiate a return, please contact our customer support team through email, phone, or our online chat system. Our representatives will guide you through the return process.
        </Text>
        <Text style={styles.content}>
          Ensure that you have the proof of purchase, such as the order number or invoice, available when contacting us.
        </Text>
        <Text style={styles.content}>
          Return the jewelry in its original condition, including any certificates, documentation, and packaging that accompanied the product.
        </Text>
        <Text style={styles.content}>
          Please note that for hygiene reasons, earrings cannot be returned or refunded unless they are damaged or defective.
        </Text>

        <Text style={styles.title}>Refund Options:</Text>
        <Text style={styles.content}>
          We offer two refund options:
        </Text>
        <Text style={styles.content}>
          a) Full Refund: If eligible, we will refund the entire purchase amount to the original payment method used for the transaction.
        </Text>
        <Text style={styles.content}>
          b) Store Credit: Alternatively, you may choose to receive store credit, which can be used for future purchases on our website.
        </Text>

        <Text style={styles.title}>Return Shipping Costs:</Text>
        <Text style={styles.content}>
          If you need to return an item due to damage, defect, or receiving the wrong product, Thiaworld Jewellery will bear the return shipping costs.
        </Text>
        <Text style={styles.content}>
          For returns due to dissatisfaction with quality or appearance, the customer will be responsible for the return shipping fees.
        </Text>

        <Text style={styles.title}>Non-Refundable Items:</Text>
        <Text style={styles.content}>
          Custom-made or personalized jewelry items are non-refundable, as they are specially created to meet your specific requirements.
        </Text>
        <Text style={styles.content}>
          Additionally, items that show signs of wear, alteration, or damage by the customer are not eligible for refunds.
        </Text>

        <Text style={styles.title}>Inspection and Processing Time:</Text>
        <Text style={styles.content}>
          Once we receive the returned item, our team will inspect it to ensure it meets the refund eligibility criteria. The refund will be processed within 7-15 business days of receiving the return.
        </Text>

        <Text style={styles.title}>Communication and Customer Support:</Text>
        <Text style={styles.content}>
          For any questions, concerns, or assistance regarding returns and refunds, please contact our customer support team. You can reach us via email at info@thiaworld.com, office phone at +91 413 406 8916, or through our online chat system on our website.
        </Text>

        <Text style={styles.content}>
          Please note that this refund policy is subject to Thiaworld Jewellery’s terms and conditions. We recommend reviewing the complete policy on our website or contacting our customer support team for further information.
        </Text>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default RefundPolicyPage;

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
    alignItems: 'center', // Center the logo
  },
  logo: {
    width: width * 0.7, // 70% of screen width for logo
    height: undefined,
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: 'gold', // Elegant color choice for title
  },
  subtitle: {
    fontWeight: 'bold',
    color: '#333', // Darker subtitle for contrast
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
});
