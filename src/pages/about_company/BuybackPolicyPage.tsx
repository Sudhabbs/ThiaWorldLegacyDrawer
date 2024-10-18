import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const { width } = Dimensions.get('window');

const BuybackPolicyPage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.contentContainer}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Main Heading */}
        {/* <Text style={styles.heading}>Buyback Policy</Text> */}

        {/* Policy Content */}
        <Text style={styles.content}>
          At Thiaworld Jewellery (a subsidiary of BBSOCEAN Online Shopping), we understand that your preferences and circumstances may change over time. To accommodate our customers’ evolving needs, we offer a buyback policy for select jewelry items. Please review the following guidelines and conditions:
        </Text>

        {/* Sections */}
        <Text style={styles.subtitle}>Eligibility for Buyback:</Text>
        <Text style={styles.content}>
          Only jewelry items that are in good condition and have been well-maintained are eligible for buyback.
        </Text>

        <Text style={styles.subtitle}>Timeframe for Buyback:</Text>
        <Text style={styles.content}>
          Jewelry items may be eligible for buyback within a specified time period after the original purchase. The exact timeframe for buyback eligibility will be clearly mentioned at the time of purchase and documented in the invoice or receipt.
        </Text>

        <Text style={styles.subtitle}>Evaluation Process:</Text>
        <Text style={styles.content}>
          To initiate the buyback process, please contact our customer support team and provide details about the jewelry item you wish to sell back. Our team will guide you through the evaluation process, which may involve assessing the condition, authenticity, and market value of the jewelry item.
        </Text>

        <Text style={styles.subtitle}>Buyback Value:</Text>
        <Text style={styles.content}>
          The buyback value offered for jewelry items will depend on various factors, including but not limited to the current market value, condition, demand, and authenticity of the item. The buyback value will be determined by Thiaworld Jewellery at its sole discretion. Please note that the buyback value may be less than the original purchase price, as it takes into account factors such as depreciation and market fluctuations.
        </Text>

        <Text style={styles.subtitle}>Buyback Payment:</Text>
        <Text style={styles.content}>
          Upon mutual agreement on the buyback value, Thiaworld Jewellery will issue the payment to you using a method agreed upon during the buyback process. The payment will be made in Indian Rupees (INR) or any other currency agreed upon between the parties involved.
        </Text>

        <Text style={styles.subtitle}>Non-Buyback Items:</Text>
        <Text style={styles.content}>
          Certain jewelry items may not be eligible for buyback. These include custom-made or personalized pieces, damaged or altered items, and items that do not meet our quality standards.
        </Text>

        <Text style={styles.subtitle}>Communication and Customer Support:</Text>
        <Text style={styles.content}>
          For inquiries, clarifications, or assistance regarding the buyback policy or process, please reach out to our customer support team. You can contact us via email at info@thiaworld.com, phone at +91 413 2916 916, or through our online chat system on our website.
        </Text>

        <Text style={styles.content}>
          Please note that this buyback policy is subject to Thiaworld Jewellery’s terms and conditions. We recommend reviewing the complete policy on our website or contacting our customer support team for further information specific to your buyback request.
        </Text>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default BuybackPolicyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: width * 0.6,
    height: undefined,
    aspectRatio: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 15,
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
    marginBottom: 15,
  },
});
