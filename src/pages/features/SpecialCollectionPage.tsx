import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, FlatList, Modal, Text, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCardNew from '../../components/ProductCardNew';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const SpecialCollectionPage = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [sortOption, setSortOption] = useState('default');
  const [filters, setFilters] = useState({ gender: '', price: '', size: '', grams: '' });
  const [showMore, setShowMore] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchSpecialCollection = async () => {
      try {
        setTimeout(() => {
          const fakeApiData = [
            { id: 1, name: 'Gold Ring 1', price: 100, image: 'https://example.com/gold-ring1.jpg', size: 'M', grams: 10, gender: 'female' },
            { id: 2, name: 'Gold Ring 2', price: 150, image: 'https://example.com/gold-ring2.jpg', size: 'L', grams: 15, gender: 'male' },
            { id: 3, name: 'Gold Chain 1', price: 200, image: 'https://example.com/gold-chain1.jpg', size: 'M', grams: 20, gender: 'female' },
            { id: 4, name: 'Gold Chain 2', price: 250, image: 'https://example.com/gold-chain2.jpg', size: 'L', grams: 25, gender: 'male' },
            { id: 5, name: 'Silver Ring 1', price: 50, image: 'https://example.com/silver-ring1.jpg', size: 'S', grams: 8, gender: 'female' },
            { id: 6, name: 'Silver Ring 2', price: 75, image: 'https://example.com/silver-ring2.jpg', size: 'M', grams: 10, gender: 'male' },
          ];
          setNewArrivals(fakeApiData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching new arrivals: ", error);
      }
    };

    fetchSpecialCollection();
  }, []);

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetailPage', { product });
  };

  const applyFilters = () => {
    setModalVisible(false);
  };

  const resetFilters = () => {
    setFilters({
      gender: '',
      price: '',
      size: '',
      grams: '',
    });
  };

  const filteredProducts = () => {
    let filtered = newArrivals;

    // Apply filters
    if (filters.gender) {
      filtered = filtered.filter(item => item.gender === filters.gender);
    }
    if (filters.price) {
      filtered = filtered.filter(item => item.price <= Number(filters.price));
    }
    if (filters.size) {
      filtered = filtered.filter(item => item.size === filters.size);
    }
    if (filters.grams) {
      filtered = filtered.filter(item => item.grams === Number(filters.grams));
    }

    // Apply sorting
    switch (sortOption) {
      case 'priceAsc':
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return filtered;
  };

  return (
    <View style={styles.container}>
      <Header title="Special Collection" />
      <View style={styles.sortContainer}>
        <Text>Sort By:</Text>
        <Picker
          selectedValue={sortOption}
          style={styles.picker}
          onValueChange={(itemValue) => setSortOption(itemValue)}
        >
          <Picker.Item label="Default" value="default" />
          <Picker.Item label="Price: Low to High" value="priceAsc" />
          <Picker.Item label="Price: High to Low" value="priceDesc" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Filter</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Options</Text>
          <Text>Gender:</Text>
          <Picker
            selectedValue={filters.gender}
            style={styles.picker}
            onValueChange={(itemValue) => setFilters({ ...filters, gender: itemValue })}
          >
            <Picker.Item label="Any" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Kids" value="kids" />
          </Picker>

          <Text>Max Price:</Text>
          <Picker
            selectedValue={filters.price}
            style={styles.picker}
            onValueChange={(itemValue) => setFilters({ ...filters, price: itemValue })}
          >
            <Picker.Item label="No Limit" value="" />
            <Picker.Item label="50" value="50" />
            <Picker.Item label="100" value="100" />
            <Picker.Item label="150" value="150" />
          </Picker>

          <Text>Size:</Text>
          <Picker
            selectedValue={filters.size}
            style={styles.picker}
            onValueChange={(itemValue) => setFilters({ ...filters, size: itemValue })}
          >
            <Picker.Item label="Any" value="" />
            <Picker.Item label="S" value="S" />
            <Picker.Item label="M" value="M" />
            <Picker.Item label="L" value="L" />
          </Picker>

          <Text>Grams:</Text>
          <Picker
            selectedValue={filters.grams}
            style={styles.picker}
            onValueChange={(itemValue) => setFilters({ ...filters, grams: itemValue })}
          >
            <Picker.Item label="Any" value="" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="20" value="20" />
          </Picker>

          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.buttonText}>Reset Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading ? (
          <ActivityIndicator size="large" color="#007BFF" />
        ) : (
          <FlatList
            data={filteredProducts().slice(0, showMore ? newArrivals.length : 5)} // Show only 5 initially
            renderItem={({ item }) => (
              <ProductCardNew 
                product={item} 
                style={styles.productCard} 
                onPress={() => handleProductPress(item)} 
              />
            )}
            keyExtractor={item => item.id.toString()} 
          />
        )}

        {/* Show More Button */}
        {!showMore && (
          <TouchableOpacity style={styles.showMoreButton} onPress={() => setShowMore(true)}>
            <Text style={styles.buttonText}>Show More</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default SpecialCollectionPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 150,
    marginLeft: 10,
  },
  resetButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  applyButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  filterButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  closeButton: {
    color: '#dc3545',
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
  },
  scrollViewContent: {
    padding: 10,
  },
  productCard: {
    marginBottom: 10,
  },
  showMoreButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
