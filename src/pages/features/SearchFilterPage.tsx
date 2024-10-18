import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Picker } from '@react-native-picker/picker';

const fakeApiData = [
  { id: 1, name: 'Pearl Necklace', price: 900, size: 'M', discount: 10, rating: 4.5, gender: 'Female', style: 'Elegant', grams: 20, image: 'https://example.com/pearl-necklace.jpg' },
  { id: 2, name: 'Gold Bracelet', price: 1200, size: 'L', discount: 5, rating: 4.0, gender: 'Unisex', style: 'Casual', grams: 15, image: 'https://example.com/gold-bracelet.jpg' },
  { id: 3, name: 'Diamond Ring', price: 2500, size: 'S', discount: 20, rating: 5.0, gender: 'Female', style: 'Luxury', grams: 10, image: 'https://example.com/diamond-ring.jpg' },
  { id: 4, name: 'Sapphire Earrings', price: 1500, size: 'M', discount: 15, rating: 4.8, gender: 'Female', style: 'Elegant', grams: 18, image: 'https://example.com/sapphire-earrings.jpg' },
];

const SearchFilterPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(fakeApiData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [minRating, setMinRating] = useState('');
  const [styleFilter, setStyleFilter] = useState('');

  // Handle search and filter logic
  const handleSearchAndFilter = () => {
    let filtered = fakeApiData;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by size
    if (selectedSize) {
      filtered = filtered.filter(item => item.size === selectedSize);
    }

    // Filter by price range
    if (minPrice && maxPrice) {
      filtered = filtered.filter(item => item.price >= minPrice && item.price <= maxPrice);
    }

    // Filter by gender
    if (selectedGender) {
      filtered = filtered.filter(item => item.gender === selectedGender);
    }

    // Filter by rating
    if (minRating) {
      filtered = filtered.filter(item => item.rating >= minRating);
    }

    // Filter by style
    if (styleFilter) {
      filtered = filtered.filter(item => item.style === styleFilter);
    }

    setFilteredData(filtered);
    setModalVisible(false); // Close modal after applying filters
  };

  return (
    <View style={styles.container}>
      <Header title="Search and Filter" />
      <ScrollView style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by product name"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* Button to open modal */}
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Filter Options</Text>
        </TouchableOpacity>

        {/* Filtered product list */}
        <Text style={styles.filterTitle}>Products</Text>
        {filteredData.map(item => (
          <View key={item.id} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <Text style={styles.productSize}>Size: {item.size}</Text>
              <Text style={styles.productDiscount}>Discount: {item.discount}%</Text>
              <Text style={styles.productRating}>Rating: {item.rating} ⭐</Text>
              <Text style={styles.productGender}>Gender: {item.gender}</Text>
              <Text style={styles.productStyle}>Style: {item.style}</Text>
              <Text style={styles.productGrams}>Grams: {item.grams}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Modal for filter options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.filterTitle}>Filter Options</Text>

            {/* Size filter */}
            <Text style={styles.filterTitle}>Filter by Size</Text>
            <Picker
              selectedValue={selectedSize}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedSize(itemValue)}
            >
              <Picker.Item label="Select Size" value="" />
              <Picker.Item label="Small (S)" value="S" />
              <Picker.Item label="Medium (M)" value="M" />
              <Picker.Item label="Large (L)" value="L" />
            </Picker>

            {/* Price range filter */}
            <Text style={styles.filterTitle}>Filter by Price Range</Text>
            <View style={styles.priceContainer}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min Price"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
              />
              <TextInput
                style={styles.priceInput}
                placeholder="Max Price"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
              />
            </View>

            {/* Gender filter */}
            <Text style={styles.filterTitle}>Filter by Gender</Text>
            <Picker
              selectedValue={selectedGender}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedGender(itemValue)}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Unisex" value="Unisex" />
            </Picker>

            {/* Rating filter */}
            <Text style={styles.filterTitle}>Filter by Minimum Rating</Text>
            <Picker
              selectedValue={minRating}
              style={styles.picker}
              onValueChange={(itemValue) => setMinRating(itemValue)}
            >
              <Picker.Item label="Select Rating" value="" />
              <Picker.Item label="1 Star" value="1" />
              <Picker.Item label="2 Stars" value="2" />
              <Picker.Item label="3 Stars" value="3" />
              <Picker.Item label="4 Stars" value="4" />
              <Picker.Item label="5 Stars" value="5" />
            </Picker>

            {/* Style filter */}
            <Text style={styles.filterTitle}>Filter by Style</Text>
            <Picker
              selectedValue={styleFilter}
              style={styles.picker}
              onValueChange={(itemValue) => setStyleFilter(itemValue)}
            >
              <Picker.Item label="Select Style" value="" />
              <Picker.Item label="Elegant" value="Elegant" />
              <Picker.Item label="Casual" value="Casual" />
              <Picker.Item label="Luxury" value="Luxury" />
            </Picker>

            {/* Apply filters button */}
            <TouchableOpacity style={styles.button} onPress={handleSearchAndFilter}>
              <Text style={styles.buttonText}>Apply Filters</Text>
            </TouchableOpacity>

            {/* Close button */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer />
    </View>
  );
};

export default SearchFilterPage;

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
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  filterTitle: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  productCard: {
    flexDirection: 'row',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productDetails: {
    flex: 1,
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#007BFF',
  },
  productSize: {
    fontSize: 12,
  },
  productDiscount: {
    fontSize: 12,
  },
  productRating: {
    fontSize: 12,
  },
  productGender: {
    fontSize: 12,
  },
  productStyle: {
    fontSize: 12,
  },
  productGrams: {
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '48%',
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#FF5722',
  },
});
