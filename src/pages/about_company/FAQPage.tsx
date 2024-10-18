import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,Image,Dimensions } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const { width } = Dimensions.get('window');
const faqs = [
  {
    question: "What is the quality of your gold jewelry?",
    answer: "All our gold jewelry comes with BIS certification, ensuring its quality and authenticity."
  },
  {
    question: "Do you offer customization for jewelry?",
    answer: "Yes, we offer customization options for many of our pieces. Please contact us for more details."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept various payment methods including credit/debit cards, net banking, and UPI."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is shipped, you will receive an email with tracking details."
  },
  {
    question: "What is your return policy?",
    answer: "We have a 30-day return policy on all items, provided they are in their original condition."
  }
];

const FAQPage = () => {
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
        <Text style={styles.title}>Frequently Asked Questions</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <TouchableOpacity style={styles.questionContainer}>
              <Text style={styles.question}>{faq.question}</Text>
            </TouchableOpacity>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default FAQPage;

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
  faqContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  questionContainer: {
    paddingVertical: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#a57200', // Gold color
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginTop: 5,
  },
});
