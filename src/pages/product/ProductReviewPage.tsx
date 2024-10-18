import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';

const ProductReviewPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Product Reviews" />
      <ScrollView>
        {/* Map through reviews and display them */}
        <Text style={styles.reviewTitle}>John Doe</Text>
        <Text style={styles.reviewText}>Great product! I absolutely love it.</Text>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ProductReviewPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reviewText: {
    marginBottom: 16,
  },
});
