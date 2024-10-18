import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';

const ShippingAddressPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cartItems = [], existingAddress } = route.params;
  // const { cartItems } = route.params || {};
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(!existingAddress);
  const [fullName, setFullName] = useState(existingAddress ? existingAddress.fullName : '');
  const [shippingAddress, setShippingAddress] = useState(existingAddress ? existingAddress.shippingAddress : '');
  const [city, setCity] = useState(existingAddress ? existingAddress.city : '');
  const [state, setState] = useState(existingAddress ? existingAddress.state : '');
  const [zipCode, setZipCode] = useState(existingAddress ? existingAddress.zipCode : '');
  const [phoneNumber, setPhoneNumber] = useState(existingAddress ? existingAddress.phoneNumber : '');
  const [email, setEmail] = useState(existingAddress ? existingAddress.email : '');
  const [totalPrice, setTotalPrice] = useState(0);

  // useEffect(() => {
  //   const total = cartItems.reduce((acc, item) => acc + parseFloat(item.price.slice(1)) * item.quantity, 0);
  //   setTotalPrice(total);
  // }, [cartItems]);
  // useEffect(() => {
  //   const total = cartItems.reduce((acc, item) => {
  //     const price = typeof item.price === 'string' ? parseFloat(item.price.slice(1)) : 0; // Ensure price is a string
  //     return acc + price * item.quantity;
  //   }, 0);
  //   setTotalPrice(total);
  // }, [cartItems]);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => {
      let price = 0;
      
      // Check if the price is a string with a dollar sign
      if (typeof item.price === 'string') {
        price = parseFloat(item.price.replace(/[^\d.-]/g, '')); // Removes any non-numeric characters
      } else if (typeof item.price === 'number') {
        price = item.price; // Use the price directly if it's already a number
      }
      
      return acc + price * item.quantity;
    }, 0);
    
    setTotalPrice(total);
  }, [cartItems]);
  
  const handleCheckout = () => {
    if (isAddingNewAddress) {
      if (!fullName || !shippingAddress || !city || !state || !zipCode || !phoneNumber || !email) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }

      const phoneNumberRegex = /^\d{10}$/;
      if (!phoneNumberRegex.test(phoneNumber)) {
        Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address.');
        return;
      }
    }

    navigation.navigate('CheckoutPage', {
      totalPrice,
      cartItems,
      shippingDetails: {
        fullName,
        shippingAddress,
        city,
        state,
        zipCode,
        phoneNumber,
        email,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Checkout</Text>

        <View style={styles.cartItemsContainer}>
          <Text style={styles.subTitle}>Selected Items</Text>
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <View key={item.id} style={styles.selectedItem}>
                {/* <Image source={item.image} style={styles.selectedImage} /> */}
                <View style={styles.selectedDetails}>
                  <Text style={styles.selectedName}>{item.name}</Text>
                  <Text style={styles.selectedPrice}>${item.price}</Text>
                  <Text style={styles.selectedPrice}>Quantity: {item.quantity}</Text>
                  <Text style={styles.selectedDescription}>{item.description}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noItems}>No items selected.</Text>
          )}
        </View>

        <View style={styles.totalPriceContainer}>
          <Text style={styles.totalPriceText}>Total Price: ${totalPrice.toFixed(2)}</Text>
        </View>

        {existingAddress && !isAddingNewAddress ? (
          <View style={styles.existingAddressContainer}>
            <Text style={styles.subTitle}>Shipping Address</Text>
            <Text>{existingAddress.fullName}</Text>
            <Text>{existingAddress.shippingAddress}</Text>
            <Text>{existingAddress.city}, {existingAddress.state} {existingAddress.zipCode}</Text>
            <Text>{existingAddress.phoneNumber}</Text>
            <Text>{existingAddress.email}</Text>

            <TouchableOpacity onPress={() => setIsAddingNewAddress(true)} style={styles.addNewAddressButton}>
              <Text style={styles.addNewAddressText}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.addressFormContainer}>
            <TextInput
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
            <TextInput
              placeholder="Shipping Address"
              value={shippingAddress}
              onChangeText={setShippingAddress}
              style={styles.input}
            />
            <TextInput
              placeholder="City"
              value={city}
              onChangeText={setCity}
              style={styles.input}
            />
            <TextInput
              placeholder="State"
              value={state}
              onChangeText={setState}
              style={styles.input}
            />
            <TextInput
              placeholder="Zip Code"
              value={zipCode}
              onChangeText={setZipCode}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.input}
              keyboardType="numeric"
              maxLength={10}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
            />
          </View>
        )}

        <Button title="Confirm Your Details" onPress={handleCheckout} color="#f76c6c" />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ShippingAddressPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    padding: 10,
    color: '#333',
    textAlign: 'center',
  },
  cartItemsContainer: {
    marginBottom: 20,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  selectedImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  selectedDetails: {
    marginLeft: 10,
    flex: 1,
  },
  selectedName: {
    fontWeight: 'bold',
  },
  selectedPrice: {
    color: '#000',
  },
  selectedDescription: {
    color: '#555',
  },
  noItems: {
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    padding: 10,
    color: '#333',
  },
  totalPriceContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  existingAddressContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  addNewAddressButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  addNewAddressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addressFormContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
});
