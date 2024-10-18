import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';

const EmailVerificationPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const navigation = useNavigation();

  // Function to handle email submission
  const handleEmailSubmit = () => {
    if (validateEmail(email)) {
      const otpToSend = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otpToSend);
      alert(`Verification email sent to ${email} with OTP: ${otpToSend}!`);
      setIsOtpSent(true);
      setEmail('');
    } else {
      alert("Please enter a valid email address.");
    }
  };

  // Function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle OTP verification
  const handleOtpVerification = () => {
    if (otp.length === 6) {
      if (otp === generatedOtp) {
        Alert.alert(
          'Processing',
          'We are processing your request. You will be informed in the next 48 hours.',
          [
            {
              text: 'OK',
              onPress: () => navigation.replace('ProfilePage'), // Replace with your homepage
            },
          ]
        );
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Email Verification" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Image 
            source={require('./../assets/logo.png')}  // Replace with your image URL
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.headingText}>
            Welcome, Vendor!
          </Text>
          <Text style={styles.infoText}>
            Enter your email address below to receive a verification code.
          </Text>
          
          <TextInput
            style={styles.emailInput}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleEmailSubmit}>
            <Text style={styles.buttonText}>Send Verification Email</Text>
          </TouchableOpacity>

          {isOtpSent && (
            <>
              <Text style={styles.infoText}>
                Enter the OTP sent to your email.
              </Text>
              <TextInput
                style={styles.otpInput}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
              <TouchableOpacity style={styles.verifyButton} onPress={handleOtpVerification}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}

          <Text style={styles.infoText}>
            Didn't receive an email? Resend it below.
          </Text>
          <TouchableOpacity style={styles.resendButton} onPress={handleEmailSubmit}>
            <Text style={styles.buttonText}>Resend Verification Email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default EmailVerificationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoText: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#555',
  },
  emailInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: '#fff',
  },
  otpInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  resendButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
