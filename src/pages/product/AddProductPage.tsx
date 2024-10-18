import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const AddProductPage = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const validateFields = () => {
    const errors = {};
    if (!productName.trim()) errors.productName = 'Product name is required';
    if (!price || isNaN(price)) errors.price = 'Valid price is required';
    if (!description.trim()) errors.description = 'Description is required';
    if (!category.trim()) errors.category = 'Category is required';
    if (!imageUri) errors.imageUri = 'Product image is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddProduct = () => {
    if (!validateFields()) {
      Alert.alert('Error', 'Please fix the highlighted errors.');
      return;
    }
    
    const newProduct = { productName, price, description, category, imageUri };

    // Simulating API request/response
    console.log(newProduct);

    // Show success alert and navigate
    Alert.alert(
      'Success',
      'Product added successfully!',
      [
        { 
          text: 'OK', 
          onPress: () => {
            navigation.navigate('VendorDashboardPage'); // Redirect to the Vendor Dashboard page
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.pageTitle}>Add New Product</Text>

        <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={styles.imagePlaceholder}>Pick an Image</Text>
          )}
        </TouchableOpacity>
        {errors.imageUri && <Text style={styles.errorText}>{errors.imageUri}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Product Name"
          value={productName}
          onChangeText={setProductName}
        />
        {errors.productName && <Text style={styles.errorText}>{errors.productName}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Price"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />
        {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}

        <Button title="Add Product" onPress={handleAddProduct} />
      </ScrollView>
      <Footer />
    </View>
  );
};

export default AddProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  imagePicker: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  imagePlaceholder: {
    color: 'gray',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
