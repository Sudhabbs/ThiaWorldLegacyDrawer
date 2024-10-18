import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions,Image } from 'react-native';
const { width } = Dimensions.get('window');
const BankCashbackPolicyPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Bank Cashback Policy</Text>
      </View> */}
      <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      <View style={styles.contentContainer}>
        <Text style={styles.content}>
          At Thiaworld Jewellery (a subsidiary of BBSOCEAN Online Shopping), we value our customers and aim to provide them with delightful shopping experiences. 
          As part of our commitment to customer satisfaction, we offer a bank cashback policy for eligible purchases made on our website.
        </Text>
        
        <Text style={styles.subtitle}>Eligibility for Bank Cashback Policy:</Text>
        <Text style={styles.content}>
          The bank cashback policy applies to purchases made by customers of Thiaworld Jewellery on our website. To be eligible for the cashback, 
          customers must make the payment using a valid bank card or payment method specified by Thiaworld Jewellery.
        </Text>
        
        <Text style={styles.subtitle}>Cashback Percentage and Limit:</Text>
        <Text style={styles.content}>
          The cashback percentage and limit will be clearly mentioned at the time of purchase or as specified in the ongoing promotional offer.
        </Text>

        <Text style={styles.subtitle}>Cashback Redemption:</Text>
        <Text style={styles.content}>
          The cashback amount will be credited directly to the customer’s bank account linked to the payment method used for the purchase.
          The redemption process may vary depending on the customer’s bank policies and procedures.
        </Text>

        <Text style={styles.subtitle}>Eligible Transactions:</Text>
        <Text style={styles.content}>
          The bank cashback policy applies to eligible transactions, which typically include purchases made for jewelry items available on our website.
        </Text>

        <Text style={styles.subtitle}>Promotion Periods and Terms:</Text>
        <Text style={styles.content}>
          The bank cashback policy may be offered during specific promotion periods, as communicated by Thiaworld Jewellery.
        </Text>

        <Text style={styles.subtitle}>Communication and Customer Support:</Text>
        <Text style={styles.content}>
          If you have any queries or concerns regarding the bank cashback policy, please contact our customer support team via email at info@thiaworld.com 
          or call us at +91 413 406 8916.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    flexGrow: 1,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
    marginBottom: 15,
  },
  header: {
    backgroundColor: '#c7a8a8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 15,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
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
});

export default BankCashbackPolicyPage;
