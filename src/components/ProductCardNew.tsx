import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductCardNew = ({ product, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <View style={styles.detailsRow}>
        <FontAwesome name="star" size={16} color="#ffd700" />
        <Text style={styles.ratingText}>4.5</Text>
        <Text style={styles.discountText}>20% off</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardNew;

const styles = StyleSheet.create({
  card: {
    height: 280,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 15,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  ratingText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  discountText: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: 'bold',
  },
});
