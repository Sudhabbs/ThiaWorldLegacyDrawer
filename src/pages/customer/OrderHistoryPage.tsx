import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';

// Sample orders data (replace this with data fetched from authentication)
const orders = [
  { id: 1, product: 'Gold Necklace', price: 500, date: '2024-09-10', image: 'https://example.com/gold_necklace.jpg' },
  { id: 2, product: 'Diamond Ring', price: 1200, date: '2024-09-05', image: 'https://example.com/diamond_ring.jpg' },
];

const OrderHistoryPage = () => {
  const navigation = useNavigation();
  const [reviews, setReviews] = useState({
    1: { review: 'Beautiful necklace!', rating: '5' },
    // 2: { review: 'Loved the ring!', rating: '4' },
  });

  const handleReviewChange = (id, text) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [id]: {
        ...prevReviews[id],
        review: text,
      },
    }));
  };

  const handleRatingChange = (id, rating) => {
    setReviews((prevReviews) => ({
      ...prevReviews,
      [id]: {
        ...prevReviews[id],
        rating: rating.toString(), // Ensure the rating is a string
      },
    }));
  };

  const calculatePoints = (orderValue) => {
    return Math.floor(orderValue / 10); // Example: 1 point for every $10 spent
  };

  const handleOrderSuccess = (orderValue) => {
    const earnedPoints = calculatePoints(orderValue);
    Alert.alert('Transaction Successful', `You've earned ${earnedPoints} points!`);
    
    // Navigate to LoyaltyProgram and pass the points
    navigation.navigate('LoyaltyProgram', { points: earnedPoints });
  };
  const navigateToLoyaltyProgram = () => {
    const points = calculatePoints(); // Assume this function calculates points based on orders
    const productPrices = orders.map(order => order.price); // Extract prices from orders
  
    navigation.navigate('LoyaltyProgramPage', { points, productPrices });
  };
  const handleSubmitReview = (id) => {
    const { review, rating } = reviews[id] || {};
    if (review && rating) {
      Alert.alert(`Review Submitted for ${orders.find(order => order.id === id).product}`, `Rating: ${rating}, Review: ${review}`);
      handleOrderSuccess(orders.find(order => order.id === id).price); // Call to handle successful transaction
      // Reset the review and rating fields after submission
      setReviews((prevReviews) => ({
        ...prevReviews,
        [id]: { review: '', rating: '' },
      }));
    } else {
      Alert.alert('Error', 'Please enter both a rating and a review');
    }
  };

  const renderStars = (id) => {
    const existingRating = reviews[id]?.rating || '';
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRatingChange(id, star)}>
            <Text style={[styles.star, existingRating >= star && styles.filledStar]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Order History" />
      <ScrollView>
        {orders.length === 0 ? (
          <View style={styles.noOrdersContainer}>
            <Text style={styles.noOrdersText}>No previous transactions found.</Text>
          </View>
        ) : (
          orders.map(order => {
            const existingReview = reviews[order.id] || { review: '', rating: '' };
            const isReviewed = existingReview.review || existingReview.rating;
            return (
              <View key={order.id} style={styles.orderContainer}>
                <Image source={{ uri: order.image }} style={styles.productImage} />
                <Text style={styles.productName}>{order.product}</Text>
                <Text style={styles.price}>${order.price}</Text>
                <Text style={styles.date}>{order.date}</Text>

                {/* Star Rating Input */}
                {renderStars(order.id)}

                {/* Review Input */}
                <TextInput
                  style={styles.input}
                  placeholder="Write your review"
                  multiline
                  numberOfLines={3}
                  value={existingReview.review}
                  onChangeText={(text) => handleReviewChange(order.id, text)}
                />

                <Button
                  title={isReviewed ? "Update Review" : "Submit Review"}
                  onPress={() => handleSubmitReview(order.id)}
                />

                {/* Display submitted review and rating */}
                {isReviewed && (
                  <View style={styles.submittedReviewContainer}>
                    <Text style={styles.submittedReviewTitle}>Your Review:</Text>
                    <Text style={styles.submittedReviewText}>{existingReview.review}</Text>
                    <Text style={styles.submittedReviewText}>Rating: {existingReview.rating}</Text>
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default OrderHistoryPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  orderContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  date: {
    fontSize: 14,
    color: '#aaa',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noOrdersText: {
    fontSize: 18,
    color: '#555',
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  star: {
    fontSize: 32,
    color: '#ccc',
    marginRight: 5,
  },
  filledStar: {
    color: '#FFD700', // Gold color for filled stars
  },
  submittedReviewContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 5,
  },
  submittedReviewTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  submittedReviewText: {
    fontSize: 14,
    color: '#333',
  },
});
