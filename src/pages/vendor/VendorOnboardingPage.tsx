import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Header from '../components/Header';
import Footer from '../components/Footer';

const VendorOnboardingSchema = Yup.object().shape({
  businessName: Yup.string().required('Business Name is required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().required('Phone number is required'),
  address: Yup.string().required('Address is required'),
});

const VendorOnboardingPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Vendor Onboarding" />
      <Formik
        initialValues={{ businessName: '', email: '', phoneNumber: '', address: '' }}
        validationSchema={VendorOnboardingSchema}
        onSubmit={values => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              onChangeText={handleChange('businessName')}
              onBlur={handleBlur('businessName')}
              value={values.businessName}
            />
            {errors.businessName && touched.businessName && <Text style={styles.error}>{errors.businessName}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
            />
            {errors.phoneNumber && touched.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Address"
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
            />
            {errors.address && touched.address && <Text style={styles.error}>{errors.address}</Text>}

            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
      <Footer />
    </View>
  );
};

export default VendorOnboardingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  error: {
    color: 'red',
  },
});
