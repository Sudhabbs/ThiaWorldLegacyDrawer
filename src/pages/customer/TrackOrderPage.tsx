import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Simulating an API call
const fetchOrderTracking = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          orderId: '12345',
          status: 'In Transit',
          expectedDelivery: '26th Sep',
          customerName: 'John Doe',
          deliveryAddress: '123 Main St, Springfield, USA',
          carrier: 'FedEx',
          items: [
            { name: 'Gold Ring', image: 'https://example.com/gold_ring.png', quantity: 1 },
            { name: 'Gold Ring', image: 'https://example.com/gold_ring.png', quantity: 1 },
          ],
          progress: [
            { date: '20th Sep', status: 'Shipped' },
            { date: '22nd Sep', status: 'Arrived at Sorting Facility' },
            { date: '23rd Sep', status: 'Out for Delivery' },
          ],
        },
        {
          orderId: '12346',
          status: 'Delivered',
          expectedDelivery: '25th Sep',
          customerName: 'John Doe',
          deliveryAddress: '123 Main St, Springfield, USA',
          carrier: 'UPS',
          items: [
            { name: 'Silver Necklace', image: 'https://example.com/silver_necklace.png', quantity: 1 },
          ],
          progress: [
            { date: '21st Sep', status: 'Shipped' },
            { date: '24th Sep', status: 'Out for Delivery' },
            { date: '25th Sep', status: 'Delivered' },
          ],
        },
      ]);
    }, 2000); // Simulate network delay
  });
};

const TrackOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderTracking().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading your orders...</Text>
      </View>
    );
  }

  // Check if there are no orders
  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <Header title="Track Your Orders" />
        <Text style={styles.noOrdersText}>No orders found.</Text>
        <Footer />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Track Your Orders" />
      <ScrollView style={styles.scrollContainer}>
        {orders.map((order) => (
          <View key={order.orderId} style={styles.orderInfoContainer}>
            <Text style={styles.orderText}>Order #{order.orderId}</Text>
            <Text style={styles.statusText}>Status: {order.status}</Text>
            <Text style={styles.expectedDeliveryText}>Expected Delivery: {order.expectedDelivery}</Text>
            <Text style={styles.customerText}>Customer: {order.customerName}</Text>
            <Text style={styles.addressText}>Delivery Address: {order.deliveryAddress}</Text>
            <Text style={styles.carrierText}>Carrier: {order.carrier}</Text>

            {/* Display order items */}
            <View style={styles.itemsContainer}>
              <Text style={styles.itemsTitle}>Order Items:</Text>
              {order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <View key={index} style={styles.itemCard}>
                    <Image source={{ uri: item.image }} style={styles.itemImage} />
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noProgressText}>No items in this order.</Text>
              )}
            </View>

            {/* Display order progress as a map */}
            <View style={styles.progressContainer}>
              <Text style={styles.progressTitle}>Current Tracking Progress:</Text>
              {order.progress.length > 0 ? (
                order.progress.map((step, index) => (
                  <View key={index} style={styles.progressStep}>
                    <MaterialIcons name="check-circle" size={24} color="#4CAF50" style={styles.marker} />
                    <View style={styles.stepContent}>
                      <Text style={styles.stepDate}>{step.date}</Text>
                      <Text style={styles.stepStatus}>{step.status}</Text>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={styles.noProgressText}>No current tracking updates available.</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
      <Footer />
    </View>
  );
};

export default TrackOrderPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  scrollContainer: {
    padding: 20,
  },
  orderInfoContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 20,
  },
  orderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statusText: {
    fontSize: 18,
    color: '#4CAF50', // Green color for 'In Transit'
    marginVertical: 5,
  },
  expectedDeliveryText: {
    fontSize: 16,
    color: '#555',
  },
  customerText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  addressText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  carrierText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  itemsContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#888',
  },
  progressContainer: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  marker: {
    marginRight: 10,
  },
  stepContent: {
    flex: 1,
  },
  stepDate: {
    fontSize: 16,
    color: '#888',
  },
  stepStatus: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
  noProgressText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10, 
  }, 
  noOrdersText: 
  { fontSize: 18, color: '#888', textAlign: 'center', marginVertical: 20, }, 
});