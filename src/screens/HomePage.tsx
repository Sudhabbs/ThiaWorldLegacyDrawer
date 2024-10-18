import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, Image, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Header from './../components/Header';
import Footer from './../components/Footer';
const { width } = Dimensions.get('window');

const images = [
  require('./../assets/logo.png'), // Replace with your actual image paths
  require('./../assets/logo.png'),
  require('./../assets/logo.png'),
];
const categories = [
  {
    name: 'Gold',
    image: require('./../assets/logo.png'),
    subcategories: [
      { name: 'Rings', image: require('./../assets/logo.png') },
      { name: 'Bangles', image: require('./../assets/logo.png') },
      { name: 'Chains', image: require('./../assets/logo.png') },
    ],
  },
  {
    name: 'Silver',
    image: require('./../assets/logo.png'),
    subcategories: [
      { name: 'Rings', image: require('./../assets/logo.png') },
      { name: 'Bangles', image: require('./../assets/logo.png') },
      { name: 'Chains', image: require('./../assets/logo.png') },
    ],
  },
  {
    name: 'Diamond',
    image: require('./../assets/logo.png'),
    subcategories: [
      { name: 'Rings', image: require('./../assets/logo.png') },
      { name: 'Earrings', image: require('./../assets/logo.png') },
      { name: 'Necklaces', image: require('./../assets/logo.png') },
    ],
  },
  {
    name: 'Platinum',
    image: require('./../assets/logo.png'),
    subcategories: [
      { name: 'Rings', image: require('./../assets/logo.png') },
      { name: 'Bangles', image: require('./../assets/logo.png') },
      { name: 'Chains', image: require('./../assets/logo.png') },
    ],
  },
];

const collections = [
  { name: 'New Arrivals', image: require('./../assets/logo.png') },
  { name: 'Special Collection', image: require('./../assets/logo.png') },
  { name: 'On Sale', image: require('./../assets/logo.png') },
  { name: 'Collection Detail', image: require('./../assets/logo.png') },
];

const HomePage = ({ navigation }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleSubcategories = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <View style={styles.container}>
      <Header />
    
    <ScrollView>
      {/* Carousel Section */}
      <Carousel
        loop
        width={width}
        height={width * 0.6} // Adjust height as needed
        autoPlay={true}
        data={images}
        renderItem={({ item }) => (
          <Image source={item} style={styles.carouselImage} />
        )}
        onSnapToItem={(index) => console.log('Current index:', index)}
      />

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeText}>Welcome to ThiaWorld!</Text>
        <Text style={styles.subtitle}>Discover exquisite jewelry collections</Text>
      </View>

      {/* Featured Products Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Array.from({ length: 5 }).map((_, index) => (
            <TouchableOpacity key={index} style={styles.productCard} onPress={() => navigation.navigate('ProductDetailPage')}>
              <Image source={require('./../assets/logo.png')} style={styles.productImage} />
              <Text style={styles.productName}>Product Name {index + 1}</Text>
              <Text style={styles.productPrice}>$99.99</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Categories Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => toggleSubcategories(category.name)}
            >
              <Image source={category.image} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Display Subcategories with Images */}
        {categories.map((category, index) => (
          expandedCategory === category.name && (
            <View key={index} style={styles.subcategoryContainer}>
              {category.subcategories.map((sub, subIndex) => (
                <TouchableOpacity
                  key={subIndex}
                  style={styles.subcategoryCard}
                  onPress={() => {
                    console.log(category); // Log the category name to the console
                    navigation.navigate('ProductListingPage', {
                      category: category.name, // Pass the category name directly
                      subcategory: sub.name    // Pass the subcategory name
                    }); // Navigate to ProductListingPage
                  }}
                >
                  <Image source={sub.image} style={styles.subcategoryImage} />
                  <Text style={styles.subcategoryText}>{sub.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )
        ))}
      </View>

      {/* Collections Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Collections</Text>
        <FlatList
          data={collections}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.collectionCard}
              onPress={() => {
                if (item.name === 'New Arrivals') {
                  navigation.navigate('NewArrivalsPage');
                } else if (item.name === 'Special Collection') {
                  navigation.navigate('SpecialCollectionPage');
                } else if (item.name === 'On Sale') {
                  navigation.navigate('OnSalePage');
                } else if (item.name === 'Collection Detail') {
                  navigation.navigate('CollectionDetailPage');
                }
              }}
            >
              <Image source={item.image} style={styles.collectionImage} />
              <Text style={styles.collectionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name} // Use item name as a unique key
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.grid}
        />
      </View>

      {/* Promotional Banner Section */}
      <View style={styles.promoSection}>
        <Image
          source={require('./../assets/logo.png')} // Replace with promotional banner image
          style={styles.promoImage}
        />
      </View>

      {/* Call to Action Section */}
      <View style={styles.callToAction}>
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('ProductListingAllPage')}>
          <Text style={styles.ctaText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    <Footer/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  welcomeSection: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  grid: {
    justifyContent: 'center', // Center items in the grid
    paddingBottom: 20, // Add padding at the bottom of the grid
  },
  collectionCard: {
    width: '45%', // Adjust width to fit two items per row
    margin: '2.5%', // Space between items
    alignItems: 'center',
    backgroundColor: '#fff', // Background color
    borderRadius: 10,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  collectionImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  collectionText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 20,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categoryCard: {
    width: 100,
    margin: 10,
    alignItems: 'center',
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subcategoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  subcategoryCard: {
    width: 80,
    margin: 10,
    alignItems: 'center',
  },
  subcategoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  subcategoryText: {
    marginTop: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  promoSection: {
    marginVertical: 20,
    alignItems: 'center',
  },
  promoImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  callToAction: {
    alignItems: 'center',
    marginVertical: 20,
  },
  ctaButton: {
    backgroundColor: '#ff9900',
    padding: 15,
    borderRadius: 10,
  },
  ctaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomePage;
