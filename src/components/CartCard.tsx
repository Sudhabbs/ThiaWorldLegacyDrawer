import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CartCard = ({ product, onIncrement, onDecrement, onRemove, onSeeMoreLikeThis }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.details}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>

        {/* Updated Increment and Decrement Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.decrementButton} onPress={onDecrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{product.quantity}</Text>

          <TouchableOpacity style={styles.incrementButton} onPress={onIncrement}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF6347' }]} onPress={onRemove}>
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#4CAF50' }]} onPress={onSeeMoreLikeThis}>
            <Text style={styles.actionButtonText}>See More Like This</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Image */}
      <Image source={product.image} style={styles.productImage} />
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center', // Align items vertically centered
  },
  details: {
    flex: 1, // Allow details to take available space
    marginRight: 10, // Space between details and image
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
  },
  incrementButton: {
    backgroundColor: 'gold',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  decrementButton: {
    backgroundColor: 'gold',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
