import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Simulated cart data
const cartItems = [
  { id: 1, name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/100', rating: 4, quantity: 1 },
  { id: 2, name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/100', rating: 5, quantity: 1 },
  // Add more items as needed
];

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigation = useNavigation(); // Access navigation object

  useEffect(() => {
    // Simulate API call to fetch cart items
    setTimeout(() => {
      setCart(cartItems);
    }, 1000);
  }, []);

  const handleRemove = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
  };

  const handleIncrement = (itemId) => {
    const updatedCart = cart.map(item => 
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const handleDecrement = (itemId) => {
    const updatedCart = cart.map(item => 
      item.id === itemId && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    const totalAmount = calculateTotal(); // Calculate total amount here
    if (cart.length > 0) { // Use cart instead of cartItems
      navigation.navigate('ShippingAddressPage', { cartItems: cart, totalAmount }); // Pass cart and total amount
    }
  };

  const renderCartItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetailPage', { product: item })}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleDecrement(item.id)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleIncrement(item.id)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.totalAmount}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.id)}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Cart" />
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Amount: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
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
    color: '#b12704',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quantityButton: {
    backgroundColor: '#e7e9ec',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
  },
  totalAmount: {
    fontSize: 16,
    color: '#b12704',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: '#e7e9ec',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  checkoutButton: {
    backgroundColor: '#b12704', // Amazon-like checkout button color
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
  },
});
