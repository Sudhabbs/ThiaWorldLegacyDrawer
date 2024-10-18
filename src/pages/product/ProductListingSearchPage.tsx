import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const ProductListingSearchPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { query } = route.params || {};

  const [products, setProducts] = useState([]); // State for products
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isSortModalVisible, setSortModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all'); // All categories by default
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
  const [filters, setFilters] = useState({ size: 'any', grams: 'any' }); // Filters state

  // Sample product data
  const sampleProducts = [
    { id: '1', name: 'Gold Ring', price: 5000, image: 'https://via.placeholder.com/150', category: 'jewelry', size: 'M', grams: '10' },
    { id: '2', name: 'Silver Necklace', price: 3000, image: 'https://via.placeholder.com/150', category: 'jewelry', size: 'S', grams: '15' },
    { id: '3', name: 'Silver Bracelet', price: 5000, image: 'https://via.placeholder.com/150', category: 'jewelry', size: 'M', grams: '15' },
    // Add more sample products as needed
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = products.filter(product =>
        product.name.replace(/\s+/g, '').toLowerCase().includes(query.replace(/\s+/g, '').toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [query, products]);

  const navigateToProductDetail = (product) => {
    navigation.navigate('ProductDetailPage', { product });
  };

  const applyFilter = () => {
    let newFilteredProducts = products;

    // Filter by selected category
    if (selectedCategory !== 'all') {
      newFilteredProducts = newFilteredProducts.filter(product => product.category === selectedCategory);
    }

    // Filter by size
    if (filters.size !== 'any') {
      newFilteredProducts = newFilteredProducts.filter(product => product.size === filters.size);
    }

    // Filter by grams
    if (filters.grams !== 'any') {
      newFilteredProducts = newFilteredProducts.filter(product => product.grams === filters.grams);
    }

    setFilteredProducts(newFilteredProducts);
    setFilterModalVisible(false); // Close the modal after applying filters
  };

  const applySort = () => {
    const newSortedProducts = [...filteredProducts].sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      return b.price - a.price;
    });

    setFilteredProducts(newSortedProducts);
    setSortModalVisible(false); // Close the modal after applying sort
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Listings</Text>

      {/* Conditionally render Filter and Sort buttons if there are filtered products */}
      {filteredProducts.length > 0 && (
        <View style={styles.filterContainer}>
          <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortModalVisible(true)} style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Sort</Text>
          </TouchableOpacity>
        </View>
      )}

      {filteredProducts.length === 0 ? (
        <View style={styles.noProductsContainer}>
          <Text style={styles.noProductsText}>No related products</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToProductDetail(item)} style={styles.productCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <Text style={styles.productSize}>Size: {item.size}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productList}
        />
      )}

      {/* Filter Modal */}
      <Modal
        visible={isFilterModalVisible}
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Options</Text>

          <Text>Size:</Text>
          <Picker
            selectedValue={filters.size}
            style={styles.picker}
            onValueChange={(itemValue) => setFilters({ ...filters, size: itemValue })}
          >
            <Picker.Item label="Any" value="any" />
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
            <Picker.Item label="Any" value="any" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="15" value="15" />
            <Picker.Item label="20" value="20" />
          </Picker>

          <Button title="Apply Filters" onPress={applyFilter} />
          <Button
            title="Remove Filters"
            onPress={() => {
              setFilters({ size: 'any', grams: 'any' }); // Reset filters
              setFilteredProducts(products); // Reset product list
              setFilterModalVisible(false); // Close the modal
            }}
            color="#ff6347"
          />
          <Button title="Close" onPress={() => setFilterModalVisible(false)} color="#ff0000" />
        </View>
      </Modal>

      {/* Sort Modal */}
      <Modal
        visible={isSortModalVisible}
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Sort by Price</Text>
          <TouchableOpacity onPress={() => { setSortOrder('asc'); applySort(); }}>
            <Text style={styles.modalOption}>Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSortOrder('desc'); applySort(); }}>
            <Text style={styles.modalOption}>High to Low</Text>
          </TouchableOpacity>
          <Button title="Close" onPress={() => setSortModalVisible(false)} color="#ff0000" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4', // Light background for better visibility
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333', // Dark color for title
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: '#fff', // White background for product card
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noProductsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsText: {
    fontSize: 18,
    color: '#888',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Dark color for product name
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  productSize: {
    fontSize: 12,
    color: '#888', // Added size display with lighter color
  },
  productList: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 10,
  },
});

export default ProductListingSearchPage;
