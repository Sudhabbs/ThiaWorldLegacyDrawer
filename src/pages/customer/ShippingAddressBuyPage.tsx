import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigation, useRoute } from '@react-navigation/native';

const ShippingAddressBuyPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedItems: initialSelectedItems = [], existingAddress } = route.params;

  // Initialize selectedItems state
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);

  const [isAddingNewAddress, setIsAddingNewAddress] = useState(!existingAddress);
  const [fullName, setFullName] = useState(existingAddress ? existingAddress.fullName : '');
  const [shippingAddress, setShippingAddress] = useState(existingAddress ? existingAddress.shippingAddress : '');
  const [city, setCity] = useState(existingAddress ? existingAddress.city : '');
  const [state, setState] = useState(existingAddress ? existingAddress.state : '');
  const [zipCode, setZipCode] = useState(existingAddress ? existingAddress.zipCode : '');
  const [phoneNumber, setPhoneNumber] = useState(existingAddress ? existingAddress.phoneNumber : '');
  const [email, setEmail] = useState(existingAddress ? existingAddress.email : '');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedItems]);

  const calculateTotalPrice = () => {
    const total = selectedItems.reduce((acc, item) => {
      const itemPrice = typeof item.price === 'string'
        ? item.price.replace(/[$,]/g, '')
        : item.price.toString();

      const numericPrice = parseFloat(itemPrice);
      return acc + numericPrice * item.quantity;
    }, 0);
    setTotalPrice(total);
  };

  const handleIncrement = (itemId) => {
    const updatedItems = selectedItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setSelectedItems(updatedItems);
  };

  const handleDecrement = (itemId) => {
    const updatedItems = selectedItems.map(item =>
      item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setSelectedItems(updatedItems);
  };

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
      selectedItems,
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

        <View style={styles.selectedItemsContainer}>
          <Text style={styles.subTitle}>Items to Buy</Text>
          {selectedItems.length > 0 ? (
            selectedItems.map(item => (
              <View key={item.id} style={styles.selectedItem}>
                <Image source={item.image} style={styles.selectedImage} />
                <View style={styles.selectedDetails}>
                  <Text style={styles.selectedName}>{item.name}</Text>
                  <Text style={styles.selectedPrice}>${item.price}</Text>
                  <Text style={styles.selectedDescription}>{item.description}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.quantityButton}>
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
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

export default ShippingAddressBuyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#007bff',
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  selectedItemsContainer: {
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
    fontSize: 16,
  },
  selectedPrice: {
    color: '#f76c6c',
  },
  selectedDescription: {
    fontSize: 12,
    color: '#666',
  },
  totalPriceContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  existingAddressContainer: {
    marginBottom: 20,
  },
  noItems: {
    textAlign: 'center',
    color: '#888',
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
