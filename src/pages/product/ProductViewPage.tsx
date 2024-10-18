import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, FlatList } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';

const ProductViewPage = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();

  // Simulate fetching product data (replace this with your API call)
  useEffect(() => {
    const fetchProducts = async () => {
      const productList = [
        {
          id: '1',
          productName: 'Sample Product 1',
          price: '150',
          quantity: 10,
          description: 'This is a sample product.',
          category: 'Jewelry',
          imageUri: 'https://example.com/sample1.jpg',
        },
        {
          id: '2',
          productName: 'Sample Product 2',
          price: '200',
          quantity: 5,
          description: 'This is another sample product.',
          category: 'Jewelry',
          imageUri: 'https://example.com/sample2.jpg',
        },
        // Add more products as needed
      ];

      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const handleEditProduct = (productId) => {
    navigation.navigate('EditProductPage', { productId });
  };

  const handleDeleteProduct = (productId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // Simulate deleting the product (replace with your API logic)
            setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
            Alert.alert('Success', 'Product deleted successfully!');
          },
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
      <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productCategory}>Category: {item.category}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit Product" onPress={() => handleEditProduct(item.id)} />
        <Button title="Delete Product" onPress={() => handleDeleteProduct(item.id)} color="red" />
      </View>
    </View>
  );

  if (products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No products available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Footer />
    </View>
  );
};

export default ProductViewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  productQuantity: {
    fontSize: 16,
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  productCategory: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
