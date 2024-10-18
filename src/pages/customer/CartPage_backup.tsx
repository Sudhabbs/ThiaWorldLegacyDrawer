import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet, Alert } from 'react-native';
import CartCard from '../../components/CartCard'; // Import your CartCard component
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../../../CartContext';

const CartPage = ({ route }) => {
  
  const navigation = useNavigation();
  const initialCartItems = route.params?.cartItems || [];
  const { cartItems: contextCartItems, updateCart } = useCart();
  const handleRemove = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    updateCart(updatedItems); // Update the context cart as well
  };
  // Use initialCartItems only if contextCartItems is empty
  const [cartItems, setCartItems] = useState(initialCartItems.length > 0 ? initialCartItems : contextCartItems);
  
  // const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.price.slice(1)) * item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => {
    const price = item.price ? parseFloat(item.price.slice(1)) : 0;
    return total + price * item.quantity;
  }, 0);
  const hasItems = cartItems.length > 0;

  const handleIncrement = (id) => {
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    updateCart(updatedItems); // Update the cart in context
  };

  const handleDecrement = (id) => {
    const updatedItems = cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedItems);
    updateCart(updatedItems); // Update the cart in context
  };
  const handleSeeMoreLikeThis = (id) => {
    // Navigate to a different page, e.g., ProductListingPage
    navigation.navigate('ProductListingPage', { productId: id });
  };
  const handleProceedToCheckout = () => {
    if (hasItems) {
      navigation.navigate('ShippingAddressPage', { selectedItems: cartItems });
    } else {
      Alert.alert('No items in cart', 'Please add items to your cart before proceeding to checkout.');
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.pageTitle}>Your Cart</Text>
        {hasItems ? (
          <View style={styles.productList}>
            {cartItems.map((item) => (
              <CartCard
                key={item.id}
                product={item}
                onIncrement={() => handleIncrement(item.id)} // Pass increment handler
                onDecrement={() => handleDecrement(item.id)} // Pass decrement handler
                onRemove={() => handleRemove(item.id)} // Pass the remove function here
    onSeeMoreLikeThis={() => handleSeeMoreLikeThis(item.id)} // Optional, if you have this function
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>No items selected in the cart.</Text>
          </View>
        )}
        {hasItems && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
            <Button title="Proceed to Checkout" onPress={handleProceedToCheckout} color="#f76c6c" />
          </View>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollView: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productList: {
    marginBottom: 20,
  },
  emptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#555',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CartPage;
