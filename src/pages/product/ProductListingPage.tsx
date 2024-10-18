import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const productsData = {
  Gold: {
    Rings: [
      { id: 1, name: 'Gold Ring 1', price: 100, image: 'https://example.com/gold-ring1.jpg', size: 'M', grams: 10, gender: 'female' },
      { id: 2, name: 'Gold Ring 2', price: 150, image: 'https://example.com/gold-ring2.jpg', size: 'L', grams: 15, gender: 'male' },
    ],
    Chain: [
      { id: 3, name: 'Gold Chain 1', price: 200, image: 'https://example.com/gold-chain1.jpg', size: 'M', grams: 20, gender: 'female' },
      { id: 4, name: 'Gold Chain 2', price: 250, image: 'https://example.com/gold-chain2.jpg', size: 'L', grams: 25, gender: 'male' },
    ],
  },
  Silver: {
    Rings: [
      { id: 5, name: 'Silver Ring 1', price: 50, image: 'https://example.com/silver-ring1.jpg', size: 'S', grams: 8, gender: 'female' },
      { id: 6, name: 'Silver Ring 2', price: 75, image: 'https://example.com/silver-ring2.jpg', size: 'M', grams: 10, gender: 'male' },
    ],
  },
};

export default function ProductListingPage({ navigation }) {
  const route = useRoute();
  const { category, subcategory } = route.params;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [visibleItems, setVisibleItems] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [filters, setFilters] = useState({ gender: '', price: '', size: '', grams: '' });
  const [selectedProduct, setSelectedProduct] = useState(null); // State to manage the selected product
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (productsData[category] && productsData[category][subcategory]) {
      const initialProducts = productsData[category][subcategory];
      setProducts(initialProducts);
      setFilteredProducts(initialProducts); // Initialize filtered products
    }
  }, [category, subcategory]);

  // Update filtered products based on filters and sorting
  useEffect(() => {
    let filtered = [...products];

    if (filters.gender) {
      filtered = filtered.filter(item => item.gender === filters.gender);
    }
    if (filters.price) {
      filtered = filtered.filter(item => item.price <= parseInt(filters.price));
    }
    if (filters.size) {
      filtered = filtered.filter(item => item.size === filters.size);
    }
    if (filters.grams) {
      filtered = filtered.filter(item => item.grams === parseInt(filters.grams));
    }

    // Apply sorting
    if (sortOption === 'priceAsc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'priceDesc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, filters, sortOption]); // Re-run when products, filters, or sortOption change

  const toggleWishlist = (id) => {
    setWishlist((prevWishlist) => 
      prevWishlist.includes(id) ? prevWishlist.filter((itemId) => itemId !== id) : [...prevWishlist, id]
    );
  };

  const handleAddToCart = (product) => {

    if (!cart.includes(product.id)) {
      setCart((prevCart) => [...prevCart, product.id]);
      alert(`Added ${product.name} to cart!`);
    } 
    else {
      navigation.navigate('CartPage', { selectedItem: product });
      // navigation.navigate('CartPage');
    }
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
  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productSize}>Size: {item.size}</Text> 
        <Text style={styles.productGrams}>Grams: {item.grams}</Text> 
        <View style={styles.buttonContainer}>
          {cart.includes(item.id) ? (
            <TouchableOpacity
              style={styles.viewCartButton}
              onPress={() => {
                setSelectedProduct(item); // Set the selected product for details
                navigation.navigate('CartPage', { selectedItem: item });
              }}
            >
              <Text style={styles.buttonText}>View Cart</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => toggleWishlist(item.id)}>
            <Icon
              name={wishlist.includes(item.id) ? 'heart' : 'heart-o'}
              size={24}
              color={wishlist.includes(item.id) ? 'red' : '#000'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.viewProductButton}
            onPress={() => {
              setSelectedProduct(item); // Set the selected product for details
              navigation.navigate('ProductDetailPage', { product: item });
            }}
          >
            <Text style={styles.buttonText}>View Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 10);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{`${category} - ${subcategory}`}</Text>
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

      <FlatList
        data={filteredProducts.slice(0, visibleItems)}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
      />

      {visibleItems < filteredProducts.length && (
        <TouchableOpacity style={styles.showMoreButton} onPress={handleShowMore}>
          <Text style={styles.buttonText}>Show More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  filterButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#ffc107',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButton: {
    color: '#dc3545',
    textAlign: 'center',
    marginTop: 10,
  },
  productItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#28a745',
  },
  productSize: {
    fontSize: 14,
  },
  productGrams: {
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  viewCartButton: {
    backgroundColor: '#28a745',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  viewProductButton: {
    backgroundColor: '#6c757d',
    padding: 5,
    borderRadius: 5,
  },
  showMoreButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

