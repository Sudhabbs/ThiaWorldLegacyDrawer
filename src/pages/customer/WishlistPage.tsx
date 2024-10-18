import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Simulated wishlist data
const wishlistItems = [
  { id: 1, name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/100', rating: 4 },
  { id: 2, name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/100', rating: 5 },
  // Add more items as needed
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigation = useNavigation(); // Access navigation object

  useEffect(() => {
    // Simulate API call to fetch wishlist items
    setTimeout(() => {
      setWishlist(wishlistItems);
    }, 1000);
  }, []);

  const handleRemove = (itemId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== itemId);
    setWishlist(updatedWishlist);
  };

  const handleAddToCart = (item) => {
    navigation.navigate('CartPage', { selectedItem: item });
  };

  const renderWishlistItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          {/* Displaying the star rating */}
          {Array(item.rating).fill().map((_, i) => (
            <Text key={i} style={styles.star}>★</Text>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.id)}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Wishlist" />
      <FlatList
        data={wishlist}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Your wishlist is empty.</Text>}
      />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f7f7f7', // Light grey background to simulate Amazon's layout
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff', // White card background
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  itemImage: {
    width: 80, // Larger product image
    height: 80,
    marginRight: 15,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 18,
    color: '#b12704', // Amazon-like price color
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  star: {
    color: '#ffb400', // Gold color for stars
    marginRight: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  addToCartButton: {
    backgroundColor: '#ffa41c', // Amazon's "Add to Cart" button color
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#e7e9ec', // Light grey remove button
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});
