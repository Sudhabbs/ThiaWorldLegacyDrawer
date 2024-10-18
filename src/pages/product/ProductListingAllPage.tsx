import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

// Mock data for products with images and additional details
const mockProducts = [
  { id: '1', name: 'Product 1', category: 'Category A', price: 20, size: 'M', grams: 10, image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Product 2', category: 'Category B', price: 30, size: 'S', grams: 15, image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Product 3', category: 'Category A', price: 25, size: 'L', grams: 20, image: 'https://via.placeholder.com/150' },
  { id: '4', name: 'Product 4', category: 'Category C', price: 15, size: 'M', grams: 10, image: 'https://via.placeholder.com/150' },
  { id: '5', name: 'Product 5', category: 'Category B', price: 50, size: 'S', grams: 15, image: 'https://via.placeholder.com/150' },
  { id: '6', name: 'Product 6', category: 'Category A', price: 40, size: 'L', grams: 20, image: 'https://via.placeholder.com/150' },
  { id: '7', name: 'Product 7', category: 'Category C', price: 10, size: 'M', grams: 10, image: 'https://via.placeholder.com/150' },
  { id: '8', name: 'Product 8', category: 'Category B', price: 45, size: 'S', grams: 15, image: 'https://via.placeholder.com/150' },
];

const ProductListingAllPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [sortOption, setSortOption] = useState('none');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const navigation = useNavigation();

  // Filter state
  const [filters, setFilters] = useState({
    category: 'all',
    size: 'any',
    grams: 'any',
    price: Infinity,
  });

  const [itemsToShow, setItemsToShow] = useState(3); // Number of items to display

  useEffect(() => {
    // Simulate fetching data
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    applyFiltering();
  }, [products, filters]);

  useEffect(() => {
    applySorting(); // Apply sorting whenever sortOption changes
  }, [filteredProducts, sortOption]);

  useEffect(() => {
    showMoreItems();
  }, [filteredProducts, itemsToShow]);

  const applyFiltering = () => {
    let filtered = products;

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply size filter
    if (filters.size !== 'any') {
      filtered = filtered.filter(product => product.size === filters.size);
    }

    // Apply grams filter
    if (filters.grams !== 'any') {
      filtered = filtered.filter(product => product.grams === Number(filters.grams));
    }

    // Apply price filter
    if (filters.price !== Infinity) {
      filtered = filtered.filter(product => product.price <= filters.price);
    }

    // Update the filtered products
    setFilteredProducts(filtered);
    setItemsToShow(3); // Reset to show 3 items after filtering
  };

  const applySorting = () => {
    let sorted = [...filteredProducts];
    if (sortOption === 'priceAsc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      sorted.sort((a, b) => b.price - a.price);
    }
    setDisplayedProducts(sorted.slice(0, itemsToShow)); // Update displayed products after sorting
  };

  const showMoreItems = () => {
    const newItems = filteredProducts.slice(0, itemsToShow);
    setDisplayedProducts(newItems);
  };

  const handleShowMore = () => {
    setItemsToShow(prev => prev + 3); // Show 3 more items
  };

  const applyFilters = () => {
    setFilterModalVisible(false);
    applyFiltering(); // Reapply filtering after modal closes
  };

  const removeFilters = () => {
    setFilters({
      category: 'all',
      size: 'any',
      grams: 'any',
      price: Infinity,
    });
    setFilterModalVisible(false);
    setItemsToShow(3); // Reset to show 3 items
    applyFiltering(); // Reapply filtering after removing filters
  };

  const navigateToProductDetail = (product) => {
    // Navigate to ProductDetailPage with the product data
    navigation.navigate('ProductDetailPage', { product });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Listing</Text>

      {/* Filter Button */}
      <Button title="Filter" onPress={() => setFilterModalVisible(true)} />
      <Modal visible={filterModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Filter Options</Text>

          <Text>Category:</Text>
          <Picker
            selectedValue={filters.category}
            style={styles.picker}
            onValueChange={(itemValue) => setFilters({ ...filters, category: itemValue })}
          >
            <Picker.Item label="All" value="all" />
            <Picker.Item label="Category A" value="Category A" />
            <Picker.Item label="Category B" value="Category B" />
            <Picker.Item label="Category C" value="Category C" />
          </Picker>

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

          <Text>Max Price:</Text>
          <Picker
            selectedValue={filters.price}
            style={styles.picker}
            onValueChange={(itemValue) => setFilters({ ...filters, price: itemValue })}
          >
            <Picker.Item label="No Limit" value={Infinity} />
            <Picker.Item label="50" value={50} />
            <Picker.Item label="100" value={100} />
            <Picker.Item label="150" value={150} />
          </Picker>

          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.buttonText}>Apply Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={removeFilters}>
            <Text style={styles.buttonText}>Remove Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Sort Button */}
      <Button title="Sort" onPress={() => setSortModalVisible(true)} />
      <Modal
        transparent={true}
        visible={sortModalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Sort by Price</Text>
          <TouchableOpacity onPress={() => { setSortOption('priceAsc'); setSortModalVisible(false); }}>
            <Text style={styles.modalOption}>Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSortOption('priceDesc'); setSortModalVisible(false); }}>
            <Text style={styles.modalOption}>High to Low</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSortModalVisible(false)}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Product List */}
      <FlatList
        data={displayedProducts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToProductDetail(item)} style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetails}>Category: {item.category}</Text>
            <Text style={styles.productDetails}>Price: ${item.price}</Text>
            <Text style={styles.productDetails}>Size: {item.size}</Text>
            <Text style={styles.productDetails}>Grams: {item.grams}</Text>
          </TouchableOpacity>
        )}
      />
      
      {/* Show More Button */}
      {itemsToShow < filteredProducts.length && (
        <Button title="Show More" onPress={handleShowMore} />
      )}
    </View>
  );
};

// Styling for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
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
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
  applyButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    color: '#007bff',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productDetails: {
    fontSize: 14,
    marginVertical: 2,
  },
  modalOption: {
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default ProductListingAllPage;
