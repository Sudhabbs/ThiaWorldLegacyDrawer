import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions,Linking } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const { width } = Dimensions.get('window');
const PrivacyPolicyPage = () => {
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
        <Text style={styles.title}>Introduction and Overview:</Text>
        <Text style={styles.content}>
        At Thiaworld Jewellery (a subsidiary of BBSOCEAN Online Shopping), protecting your privacy and ensuring the security of your personal information is of utmost importance to us. This privacy policy outlines how we collect, use, and safeguard your information when you interact with our website (https://thiaworld.com) or engage in transactions with us. By using our services, you agree to the terms and practices described in this policy.
        </Text>
        <Text style={styles.title}>Information We Collect:</Text>
        <Text style={styles.content}>
        We may collect personal information, such as your name, email address, shipping address, billing address, contact details, and date of birth, when you create an account, place an order, or interact with our website. To process your orders and ensure secure transactions, we may also collect payment details such as credit card information, bank account details, or other payment method information. We do not store your payment information on our servers. Additionally, we may collect non-personal information about your interactions with our website, such as your IP address, browser type, device information, operating system, referring URLs, and browsing patterns. If you choose to connect your social media accounts with our website, we may collect certain information from your social media profiles as permitted by the social media platform and your privacy settings.
        </Text>
        <Text style={styles.title}>Personal Information:</Text>
        <Text style={styles.content}>
        To process your orders and ensure secure transactions, we collect payment details such as credit card information, bank account details, or other payment method information. We do not store your payment information on our servers.
        </Text>
        <Text style={styles.title}>Browsing Information:</Text>
        <Text style={styles.content}>
        We may collect non-personal information about your interactions with our website, including your IP address, browser type, device information, operating system, referring URLs, and browsing patterns.
        </Text>
        <Text style={styles.title}>Social Media Information:</Text>
        <Text style={styles.content}>
        If you choose to connect your social media accounts with our website, we may collect certain information from your social media profiles, as permitted by the social media platform and your privacy settings.
        </Text>
        <Text style={styles.title}>Use of Information:</Text>
        <Text style={styles.content}>
        We use the collected information to process and fulfill your orders, personalize your shopping experience, provide recommendations, and tailor our product offerings and promotions to your preferences. We may also use it to communicate with you regarding any issues or inquiries related to your order.
        </Text>
        <Text style={styles.title}>Order Processing:</Text>
        <Text style={styles.content}>
        We use the collected information to process and fulfill your orders, including order confirmation, shipping, and delivery updates. We may also use it to communicate with you regarding any issues or inquiries related to your order.
        </Text>
        <Text style={styles.title}>Personalization:</Text>
        <Text style={styles.content}>
        We may use your information to personalize your shopping experience, provide recommendations, and tailor our product offerings and promotions to your preferences.
        </Text>
        <Text style={styles.title}>Marketing Communication:</Text>
        <Text style={styles.content}>
        With your consent, we may send you promotional emails, newsletters, or marketing communications about our products, offers, or events. You can opt out of these communications at any time by using the unsubscribe link provided in the email or by contacting our customer support.
        </Text>
        <Text style={styles.title}>Customer Support</Text>
        <Text style={styles.content}>
        We may use your information to respond to your inquiries, provide customer support, and address any concerns or issues you may have.
        </Text>
        <Text style={styles.title}>Legal Obligations:</Text>
        <Text style={styles.content}>
        We may use and disclose your information as required by law, regulation, or legal process. This includes responding to governmental requests, enforcing our terms and conditions, and protecting our rights, property, or safety, as well as that of our customers and others.
        </Text>
        <Text style={styles.title}>Information Sharing:</Text>
        <Text style={styles.content}>
        We respect your privacy and do not sell or rent your personal information to third parties for their marketing purposes. We may share your information with trusted service providers and business partners who assist us in operating our website, processing payments, delivering orders, conducting marketing campaigns, or providing customer support. These entities are obligated to protect your information and use it only for the purposes specified by us. In certain circumstances, we may be required to disclose your information to comply with legal obligations, respond to valid legal requests, protect against fraudulent or unauthorized transactions, or investigate and prevent illegal activities or violations of our policies. If Thiaworld Jewellery undergoes a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of the transaction, subject to the privacy policy of the acquiring entity.
        </Text>
        <Text style={styles.title}>Respect for Privacy:</Text>
        <Text style={styles.content}>
        We respect your privacy and do not sell or rent your personal information to third parties for their marketing purposes.
        </Text>
        <Text style={styles.title}>Trusted Service Providers and Business Partners:</Text>
        <Text style={styles.content}>
        We may share your information with trusted service providers and business partners who assist us in operating our website, processing payments, delivering orders, conducting marketing campaigns, or providing customer support. These entities are obligated to protect your information and use it only for the purposes specified by us.
        </Text>
        <Text style={styles.title}>Disclosure of Information:</Text>
        <Text style={styles.content}>
        In certain circumstances, we may be required to disclose your information to comply with legal obligations, respond to valid legal requests, protect against fraudulent or unauthorized transactions, or investigate and prevent illegal activities or violations of our policies.
        </Text>
        <Text style={styles.title}>Merger, Acquisition, or Sale of Assets:</Text>
        <Text style={styles.content}>
        If Thiaworld Jewellery undergoes a merger, acquisition, or sale of all or a portion of its assets, your information may be transferred as part of the transaction, subject to the privacy policy of the acquiring entity.
        </Text>
        <Text style={styles.title}>Data Retention:</Text>
        <Text style={styles.content}>
        We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, including legal, accounting, or reporting requirements. The specific retention periods may vary depending on the nature of the information and the applicable laws and regulations.
        </Text>
        <Text style={styles.title}>Data Security:</Text>
        <Text style={styles.content}>
        We implement and maintain reasonable security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption technologies.
        </Text>
        <Text style={styles.title}>Conclusion and Contact Information:</Text>
        <Text style={styles.content}>
        By using our services, you agree to the practices outlined in this privacy policy. If you have any questions or concerns about our privacy policy or the security of your personal information, please do not hesitate to contact us at -  
        <Text 
                    style={styles.link} 
                    onPress={() => Linking.openURL('mailto:info@thiaworld.com')}
                >
                     info@thiaworld.com.
                </Text>
        </Text>
        {/* Add more sections of the privacy policy here */}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default PrivacyPolicyPage;

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
