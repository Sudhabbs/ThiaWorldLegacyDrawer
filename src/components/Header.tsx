import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text, TextInput, Modal, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation(); // Access the navigation object
  const [searchText, setSearchText] = useState('');
  const [isPriceModalVisible, setPriceModalVisible] = useState(false); // State to control the visibility of the price modal
  const [priceData, setPriceData] = useState(null); // State to store price data
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(null); // Error state for API call

  // Function to handle search button press
  const handleSearch = () => {
    if (searchText.trim()) {
      navigation.navigate('ProductListingSearchPage', { query: searchText }); // Navigate to search results page with the query
    }
  };

  // Function to open/close the price modal
  const togglePriceModal = () => {
    setPriceModalVisible(!isPriceModalVisible);

    // If opening the modal and price data is not fetched yet, fetch it
    if (!isPriceModalVisible && !priceData) {
      fetchPriceData();
    }
  };

  // Fetch price data from fake API
  const fetchPriceData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.example.com/prices'); // Replace with your fake API URL
      const data = await response.json();
      setPriceData(data);
    } catch (err) {
      setError('Failed to fetch price data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        {/* Logo Button - Navigates to About Us Page */}
        <TouchableOpacity
          style={styles.logoContainer}
          onPress={() => navigation.navigate('AboutUsPage')}
        >
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
          />
        </TouchableOpacity>

        {/* Search Input */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch} // Handle search on keyboard "Enter"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Gold and Silver Price Button */}
      <TouchableOpacity onPress={togglePriceModal} style={styles.priceButton}>
        <Text style={styles.priceButtonText}>Price</Text>
      </TouchableOpacity>

      {/* Modal to show price details */}
      <Modal
        visible={isPriceModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={togglePriceModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Today Prices</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <ScrollView>
                {priceData ? (
                  <>
                    <Text style={styles.priceDetail}>Gold 24K: ₹{priceData.gold24k} 1G</Text>
                    <Text style={styles.priceDetail}>Gold 22K: ₹{priceData.gold22k} 1G</Text>
                    <Text style={styles.priceDetail}>Silver: ₹{priceData.silver} 1G</Text>
                  </>
                ) : (
                  <Text>No price data available</Text>
                )}
              </ScrollView>
            )}
            <TouchableOpacity onPress={togglePriceModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  searchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  priceButton: {
    backgroundColor: '#ffcc00',
    padding: 8,
    borderRadius: 5,
  },
  priceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  priceDetail: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
});

export default Header;
