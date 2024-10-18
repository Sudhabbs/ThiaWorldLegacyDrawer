import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';

const SalesAgentDashboardPage = () => {
  return (
    <View style={styles.container}>
      <Header title="Sales Agent Dashboard" />
      <ScrollView>
        <Text style={styles.pageTitle}>Welcome, Sales Agent!</Text>

        <View style={styles.dashboardSection}>
          <Text style={styles.sectionTitle}>Track Your Sales</Text>
          <Text>Total Sales: $15,000</Text>
          <Text>Orders: 100</Text>
        </View>

        <View style={styles.dashboardSection}>
          <Text style={styles.sectionTitle}>Onboard New Customers</Text>
          <Button title="Onboard Customer" onPress={() => {}} />
        </View>

        <View style={styles.dashboardSection}>
          <Text style={styles.sectionTitle}>Commission Tracking</Text>
          <Button title="Track Commissions" onPress={() => {}} />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default SalesAgentDashboardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  dashboardSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
