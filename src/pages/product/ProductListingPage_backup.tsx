import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; 
import { useCart } from '../../../CartContext'; // Import useCart

const fakeProducts = [
  {
    id: '1',
    name: 'Gold Ring',
    basePrice: 999,
    rating: 4.5,
    description: 'Description for Product 1.',
    image: require('./../assets/logo.png'),
    sizes: [
      { label: 'Small (1g)', price: 999 },
      { label: 'Medium (2g)', price: 1999 },
      { label: 'Large (3g)', price: 2999 },
    ],
    category: 'Gold',
  },
  {
    id: '2',
    name: 'Gold Chain',
    basePrice: 799,
    rating: 4,
    description: 'Description for Product 2.',
    image: require('./../assets/logo.png'),
    sizes: [
      { label: 'Small (1g)', price: 799 },
      { label: 'Medium (2g)', price: 1599 },
      { label: 'Large (3g)', price: 2399 },
    ],
    category: 'Gold',
  },
  {
    id: '3',
    name: 'Silver Chain',
    basePrice: 799,
    rating: 4,
    description: 'Description for Product 2.',
    image: require('./../assets/logo.png'),
    sizes: [
      { label: 'Small (1g)', price: 709 },
      { label: 'Medium (2g)', price: 1099 },
      { label: 'Large (3g)', price: 2099 },
    ],
    category: 'Silver',
  },
];

const ProductListingPage = () => {
  const navigation = useNavigation();
  const { cartItems, addToCart } = useCart(); // Get cart items and addToCart function
  const [wishlist, setWishlist] = useState([]); // State for wishlist
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({});
  // View Product Details
  const handleViewProduct = (product) => {
    navigation.navigate('ProductDetailPage', { product });
  };

  const handleSizeChange = (productId, selectedSize) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: selectedSize }));
  };

  const handleQuantityChange = (productId, action) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: action === 'increment' ? (prev[productId] || 1) + 1 : Math.max((prev[productId] || 1) - 1, 1)
    }));
  };

  const toggleWishlist = (product) => {
    if (wishlist.some(wishlistItem => wishlistItem.id === product.id)) {
      setWishlist(wishlist.filter(wishlistItem => wishlistItem.id !== product.id));
      Alert.alert('Removed from Wishlist', `${product.name} has been removed from your wishlist.`);
    } else {
      setWishlist([...wishlist, product]);
      Alert.alert('Added to Wishlist', `${product.name} has been added to your wishlist.`);
    }
  };

  const renderProductItem = ({ item }) => {
    const isAlreadyInCart = cartItems.some(cartItem => cartItem.id === item.id);
    const isInWishlist = wishlist.some(wishlistItem => wishlistItem.id === item.id); // Check if product is in wishlist
    const selectedSize = selectedSizes[item.id] || item.sizes[0];
    const quantity = quantities[item.id] || 1;
    const totalPrice = selectedSize.price * quantity;

    const handleAddToCart = () => {
      addToCart(item); // Use the addToCart from context
      if (!isAlreadyInCart) {
        Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
      }
      navigation.navigate('CartPage'); // Always navigate to CartPage after adding
    };


return (
      <View style={styles.productCard}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${totalPrice}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>

        {/* Rating */}
        <View style={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <FontAwesome
              key={i}
              name="star"
              size={20}
              color={i < Math.floor(item.rating) ? '#FFD700' : '#ccc'}
            />
          ))}
          <Text>{item.rating}</Text>
        </View>

        {/* Size Selection */}
        <View style={styles.sizeContainer}>
          <Text>Select Size/Gram:</Text>
          <Picker
            selectedValue={selectedSize.label}
            style={styles.sizePicker}
            onValueChange={(itemValue) => {
              const selectedOption = item.sizes.find(size => size.label === itemValue);
              handleSizeChange(item.id, selectedOption);
            }}
          >
            {item.sizes.map((sizeOption) => (
              <Picker.Item key={sizeOption.label} label={sizeOption.label} value={sizeOption.label} />
            ))}
          </Picker>
        </View>

        {/* Quantity Selector */}
        <View style={styles.quantityContainer}>
          <Text>Quantity:</Text>
          <View style={styles.quantityButtons}>
            <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'decrement')}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text>{quantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'increment')}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.cartButton, isAlreadyInCart ? styles.cartButtonActive : {}]}
            onPress={handleAddToCart}
          >
            {/* <FontAwesome name={isAlreadyInCart ? "shopping-cart" : "plus"} size={20} color="#fff" /> */}
            <Text style={styles.cartButtonText}>{isAlreadyInCart ? "View Cart" : "Add to Cart"}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.viewProductButton} onPress={() => handleViewProduct(item)}>
            <Text style={styles.viewProductText}>View Product</Text>
          </TouchableOpacity>
        </View>

        {/* Wishlist Button */}
        <TouchableOpacity 
          style={styles.wishlistButton} 
          onPress={() => toggleWishlist(item)} // Toggle wishlist functionality
        >
          <FontAwesome name="heart" size={24} color={isInWishlist ? 'red' : 'gray'} />
        </TouchableOpacity>
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Product Listing</Text>
      <FlatList
        data={fakeProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5', // Light background for better contrast
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333', // Darker text for readability
  },
  productList: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#28a745',
    fontWeight: '600',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  cartButtonActive: {
    backgroundColor: '#ffc107', // Change color when item is in cart
  },
  cartButtonText: {
    color: '#fff',
    marginLeft: 5,
  },
  viewProductButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewProductText: {
    color: '#fff',
  },
  wishlistButton: {
    alignSelf: 'flex-end',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sizeContainer: {
    marginBottom: 10,
  },
  sizePicker: {
    height: 40,
    width: 150,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  quantityButton: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#ddd',
    borderRadius: 4,
    marginHorizontal: 5,
  },
});

export default ProductListingPage;