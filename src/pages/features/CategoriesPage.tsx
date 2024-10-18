import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Simulated categories data with subcategory images
const subcategoryImages = {
  Rings: require('./../assets/logo.png'),
  Chain: require('./../assets/logo.png'),
  Anklet: require('./../assets/logo.png'),
  Bangle: require('./../assets/logo.png'),
  Nosepin: require('./../assets/logo.png'),
  Earrings: require('./../assets/logo.png'),
};

const categoriesData = [
  { id: 1, name: 'Gold', image: require('./../assets/logo.png'), subcategories: ['Rings', 'Chain', 'Anklet', 'Bangle', 'Nosepin', 'Earrings'] },
  { id: 2, name: 'Silver', image: require('./../assets/logo.png'), subcategories: ['Rings', 'Chain', 'Anklet', 'Bangle', 'Nosepin', 'Earrings'] },
  { id: 3, name: 'Platinum', image: require('./../assets/logo.png'), subcategories: ['Rings', 'Chain', 'Anklet', 'Bangle', 'Nosepin', 'Earrings'] },
  { id: 4, name: 'Diamond', image: require('./../assets/logo.png'), subcategories: ['Rings', 'Chain', 'Anklet', 'Bangle', 'Nosepin', 'Earrings'] },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => setCategories(categoriesData), 1000);
  }, []);

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem} onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}>
      <Image source={item.image} style={styles.categoryImage} resizeMode="cover" />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderSubcategory = (subcategory) => (
    <TouchableOpacity
      style={styles.subcategoryItem}
      onPress={() => navigation.navigate('ProductListingPage', { 
        category: categories.find(cat => cat.id === selectedCategory)?.name,
        subcategory 
      })}
    >
      <Image source={subcategoryImages[subcategory]} style={styles.subcategoryImage} resizeMode="cover" />
      <Text style={styles.subcategoryName}>{subcategory}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.headerText}>Shop by Category</Text>
        <Text style={styles.subHeaderText}>Explore our diverse range of products</Text>
      </View>

      <Text style={styles.sectionTitle}>Material Type</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />

      {selectedCategory && (
        <>
          <Text style={styles.sectionTitle}>Jewellery Type</Text>
          <FlatList
            data={categories.find(cat => cat.id === selectedCategory)?.subcategories || []}
            renderItem={({ item }) => renderSubcategory(item)}
            keyExtractor={(item) => item}
            horizontal
            contentContainerStyle={styles.subcategoryListContainer}
          />
        </>
      )}

      <Footer />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  subcategoryListContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    elevation: 2,
    overflow: 'hidden',
    alignItems: 'center',
  },
  categoryImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    color: '#555',
  },
  subcategoryItem: {
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    elevation: 1,
    alignItems: 'center',
  },
  subcategoryImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginBottom: 5,
  },
  subcategoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  footerLink: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginVertical: 2,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 10,
  },
});
