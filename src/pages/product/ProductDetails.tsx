import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProductDetails = () => {
  const route = useRoute();
  const { product } = route.params || {};
  const [selectedSize, setSelectedSize] = useState(product?.priceOptions[0]?.size);
  const [selectedPrice, setSelectedPrice] = useState(product?.priceOptions[0]?.price);
  const [productQuantity, setProductQuantity] = useState(1);
  const [expandedSections, setExpandedSections] = useState({
    summary: false,
    description: false,
    features: false,
    specialization: false,
    additionalInfo: false,
    ratings: false,
  });
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Fetched product data:', product);
  }, [product]);

  const incrementQuantity = () => {
    setProductQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setProductQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    const totalPrice = selectedPrice * productQuantity;
    console.log(`Added to cart: ${product?.name} (Total Price: ₹${totalPrice.toFixed(2)})`);
  };

  const handleBuyNow = () => {
    console.log(`Buy Now button clicked`);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const selectedOption = product.priceOptions.find((option) => option.size === size);
    if (selectedOption) {
      setSelectedPrice(selectedOption.price);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

 const renderStars = (rating: number) => {
     const filledStars = Math.floor(rating);
     const halfStar = rating % 1 >= 0.5; // Check if there's a half star
     const totalStars = 5;
     const stars = [];

     // Loop through totalStars to create star icons
     for (let i = 0; i < totalStars; i++) {
       if (i < filledStars) {
         stars.push(<Ionicons key={i} name="star" size={20} color="#96B416" />);
       } else if (i === filledStars && halfStar) {
         stars.push(<Ionicons key={i} name="star-half" size={20} color="#96B416" />);
       } else {
         stars.push(<Ionicons key={i} name="star-outline" size={20} color="#96B416" />);
       }
     }

     return stars;
   };

    console.log('Customer Ratings:', product.customerRatings);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product details not available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Product Image */}
        <Image source={product.image} style={styles.productImage} />

        {/* Product Information */}
        <View style={styles.productDetailsContainer}>
          <Text style={styles.productName}>{product.name}</Text>

          {/* Displaying Price */}
          <View style={styles.productPriceQuantity}>
            <Text style={styles.productPrice}>₹{(selectedPrice * productQuantity).toFixed(2)}</Text>
            {/* Quantity Controls */}
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={decrementQuantity}>
                <Ionicons name="remove-circle-outline" size={28} color="#96B416" />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{productQuantity}</Text>
              <TouchableOpacity onPress={incrementQuantity}>
                <Ionicons name="add-circle-outline" size={28} color="#96B416" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Size Selection */}
          <View style={styles.pickerContainer}>
            <Text style={styles.label}>Select Size:</Text>
            <Picker
              selectedValue={selectedSize}
              style={styles.picker}
              onValueChange={(itemValue) => handleSizeChange(itemValue)}
            >
              {product.priceOptions.map((option) => (
                <Picker.Item key={option.size} label={option.size} value={option.size} />
              ))}
            </Picker>
          </View>

          {/* Customer Ratings */}
          <Text style={styles.ratingText}>Customer Ratings: {product.customerRatings.rating}/5 (Based on {product.customerRatings.reviewsCount} reviews)</Text>
          <View style={styles.starsContainer}>
            {renderStars(product.customerRatings.rating)}
          </View>

          {/* Accordion Sections */}
          <View style={styles.accordionContainer}>
            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('summary')}>
              <Text style={styles.accordionTitle}>Product Summary</Text>
              <Ionicons name={expandedSections.summary ? "chevron-up" : "chevron-down"} size={20} />
            </TouchableOpacity>
            {expandedSections.summary && (
              <Text style={styles.accordionContent}>{product.summary}</Text>
            )}

            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('description')}>
              <Text style={styles.accordionTitle}>Product Description</Text>
              <Ionicons name={expandedSections.description ? "chevron-up" : "chevron-down"} size={20} />
            </TouchableOpacity>
            {expandedSections.description && (
              <Text style={styles.accordionContent}>{product.description}</Text>
            )}

            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('features')}>
              <Text style={styles.accordionTitle}>Key Features</Text>
              <Ionicons name={expandedSections.features ? "chevron-up" : "chevron-down"} size={20} />
            </TouchableOpacity>
            {expandedSections.features && (
              <View style={styles.accordionContent}>
                {product.keyFeatures.map((feature, index) => (
                  <Text key={index} style={styles.featureItem}>• {feature}</Text>
                ))}
              </View>
            )}

            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('specialization')}>
              <Text style={styles.accordionTitle}>Product Specialization</Text>
              <Ionicons name={expandedSections.specialization ? "chevron-up" : "chevron-down"} size={20} />
            </TouchableOpacity>
            {expandedSections.specialization && (
              <Text style={styles.accordionContent}>{product.specialization}</Text>
            )}

            <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('additionalInfo')}>
              <Text style={styles.accordionTitle}>Additional Information</Text>
              <Ionicons name={expandedSections.additionalInfo ? "chevron-up" : "chevron-down"} size={20} />
            </TouchableOpacity>
            {expandedSections.additionalInfo && (
              <Text style={styles.accordionContent}>{product.additionalInfo}</Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Add to Cart Button */}
       <View style={styles.buttonContainer}>

      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        {/*<Ionicons name="cart-outline" size={20} color="#5a6c0d" />*/}
        <Ionicons name="cart-outline" size={20} color="#fff" />
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
         <Ionicons name="checkmark-circle-outline" size={20} color="#96B416" />
         <Text style={styles.buyNowText}>Buy Now</Text>
       </TouchableOpacity>
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 70, // Adjust for the fixed button height
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productDetailsContainer: {
    padding: 30,
  },
  productName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#96B416"
  },
  productPriceQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityValue: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  pickerContainer: {
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#d6d6d6',
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  ratingText: {
    fontSize: 16,
    marginVertical: 5,
    color: '#666',
  },
  accordionContainer: {
    marginTop: 20,
  },
  accordionHeader: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accordionContent: {
    padding: 15,
    backgroundColor: '#fff',
  },
  featureItem: {
    fontSize: 14,
    marginVertical: 3,
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      elevation: 5,
    },
  addToCartButton: {
flex: 1,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: '#96B416',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#d6d6d6',
  },
  addToCartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff"
  },
  buyNowButton: {
      flex: 1,
      backgroundColor: 'transparent',
      borderColor: '#96B416',
      borderWidth: 2,
        gap: 10,
      paddingVertical: 15,
      flexDirection: 'row',
      alignItems: 'center',
          justifyContent: 'center',
    },
    buyNowText: {
      color: '#96B416',
      fontWeight: 'bold',
    },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ProductDetails;
