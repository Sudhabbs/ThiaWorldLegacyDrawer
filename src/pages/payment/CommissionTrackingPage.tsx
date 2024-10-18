import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CommissionCard from '../../components/CommissionCard';
import { LineChart } from 'react-native-chart-kit';

// Sample data for initial commissions
const initialCommissions = [
  {
    id: 1,
    customer_id: 1012,
    customer: 'John Doe',
    totalSales: 5000,
    commission1: 200,
    commission2: 150,
    transactionDate: '2024-10-01',
  },
  {
    id: 2,
    customer_id: 1021,
    customer: 'Mark Hendry',
    totalSales: 10000,
    commission1: 500,
    commission2: 300,
    transactionDate: '2024-10-05',
  },
  {
    id: 3,
    customer_id: 1031,
    customer: 'Alice Smith',
    totalSales: 7500,
    commission1: 300,
    commission2: 200,
    transactionDate: '2024-10-10',
  },
  {
    id: 4,
    customer_id: 1031,
    customer: 'Alice Smith',
    totalSales: 4000,
    commission1: 100,
    commission2: 80,
    transactionDate: '2024-10-11',
  },
];

export default function CommissionTrackingPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const screenWidth = Dimensions.get('window').width;

  // Remove duplicates and summarize commissions
  const uniqueCustomers = initialCommissions.reduce((acc, curr) => {
    const existingIndex = acc.findIndex(item => item.customer_id === curr.customer_id);
    if (existingIndex !== -1) {
      acc[existingIndex].totalSales += curr.totalSales;
      acc[existingIndex].commission1 += curr.commission1;
      acc[existingIndex].commission2 += curr.commission2;
    } else {
      acc.push({ ...curr });
    }
    return acc;
  }, []);

  const [searchResults, setSearchResults] = useState(uniqueCustomers);
  const totalPages = uniqueCustomers.length + 1; // Including the welcome page

  // Get filtered data based on the current customer_id
  const getFilteredData = useCallback((customerId) => {
    return initialCommissions.filter((commission) => commission.customer_id === customerId);
  }, []);

  // Search functionality
  const handleSearch = useCallback(() => {
    if (searchText.trim()) {
      const filteredCustomers = uniqueCustomers.filter((customer) =>
        customer.customer.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredCustomers);
    } else {
      setSearchResults(uniqueCustomers);
    }
  }, [searchText, uniqueCustomers]);

  // Handle customer click to update pagination based on customer_id
  const handleCustomerClick = useCallback((customerId) => {
    const index = uniqueCustomers.findIndex(customer => customer.customer_id === customerId);
    if (index !== -1) {
      setCurrentPage(index + 2); // +2 to account for the welcome page and zero-based index
    }
  }, [uniqueCustomers]);

  // Handle chart data point click
  const handleDataPointClick = useCallback((value, index, commissionType) => {
    const customerId = getCustomerIdForPage();
    const filteredData = getFilteredData(customerId);
    const selectedItem = filteredData[index];

    Alert.alert(
      'Commission Details',
      `Date: ${selectedItem.transactionDate}\nAmount: $${selectedItem.totalSales}\nCommission: $${commissionType === 'commission1' ? selectedItem.commission1 : selectedItem.commission2}`,
      [{ text: 'OK' }]
    );
  }, [getFilteredData]);

  // Render the commission card for each customer
  const renderCommission = useCallback(({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleCustomerClick(item.customer_id)}>
        <CommissionCard
          customer={item.customer}
          totalSales={`$${item.totalSales}`}
          transactionDate={`Transaction Date: ${item.transactionDate}`}
          commission1={`$${item.commission1}`}
          commission2={`$${item.commission2}`}
        />
      </TouchableOpacity>
    );
  }, [handleCustomerClick]);

  // Correctly map pages to customer IDs
  const getCustomerIdForPage = useCallback(() => {
    if (currentPage === 1) return null;
    return uniqueCustomers[currentPage - 2].customer_id; // Adjusting for zero-based index
  }, [currentPage, uniqueCustomers]);

  // Pagination button states
  const isNextDisabled = currentPage >= totalPages;
  const isPrevDisabled = currentPage === 1;
  const isFirstDisabled = currentPage === 1;
  const isLastDisabled = currentPage === totalPages;

  // Render chart for commissions
  const renderCommissionCharts = useCallback((filteredData) => {
    if (filteredData.length === 0) return null;
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Commission 1 Overview</Text>
        <LineChart
          data={{
            labels: filteredData.map((c) => c.customer),
            datasets: [
              {
                data: filteredData.map((c) => c.commission1),
                color: () => 'rgba(54, 162, 235, 1)',
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth - 30}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
          onDataPointClick={({ value, index }) => handleDataPointClick(value, index, 'commission1')}
        />
        <Text style={styles.chartTitle}>Commission 2 Overview</Text>
        <LineChart
          data={{
            labels: filteredData.map((c) => c.customer),
            datasets: [
              {
                data: filteredData.map((c) => c.commission2),
                color: () => 'rgba(255, 99, 132, 1)',
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth - 30}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
          onDataPointClick={({ value, index }) => handleDataPointClick(value, index, 'commission2')}
        />
      </View>
    );
  }, [screenWidth, handleDataPointClick]);

  // Render content based on the current page
  const renderContent = useCallback(() => {
    if (currentPage === 1) {
      return (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome to the Commission Tracking System</Text>
          <Text style={styles.welcomeSubtitle}>Customer List:</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search customers..."
              value={searchText}
              onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={searchResults}
            keyExtractor={(item) => item.customer_id.toString()}
            renderItem={renderCommission}
            ListEmptyComponent={<Text style={styles.noDataText}>No customers found.</Text>}
          />
        </View>
      );
    } else {
      const customerId = getCustomerIdForPage();
      const filteredData = getFilteredData(customerId);
      return (
        <ScrollView>
          {renderCommissionCharts(filteredData)}
          <FlatList
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCommission}
            ListEmptyComponent={<Text style={styles.noDataText}>No commission data available.</Text>}
          />
        </ScrollView>
      );
    }
  }, [currentPage, searchText, searchResults, handleSearch, getCustomerIdForPage, getFilteredData, renderCommissionCharts, renderCommission]);

  return (
    <View style={styles.container}>
    <Header title="Commission Tracking" />
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {renderContent()}
      {/* <Footer /> */}
    </ScrollView>
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[styles.paginationButton, isFirstDisabled && styles.disabledButton]}
        disabled={isFirstDisabled}
        onPress={() => setCurrentPage(1)}
      >
        <Text style={styles.paginationButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.paginationButton, isPrevDisabled && styles.disabledButton]}
        disabled={isPrevDisabled}
        onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      >
        <Text style={styles.paginationButtonText}>Previous</Text>
      </TouchableOpacity>
      <Text style={styles.pageIndicator}>
        Page {currentPage} of {totalPages}
      </Text>
      <TouchableOpacity
        style={[styles.paginationButton, isNextDisabled && styles.disabledButton]}
        disabled={isNextDisabled}
        onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      >
        <Text style={styles.paginationButtonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.paginationButton, isLastDisabled && styles.disabledButton]}
        disabled={isLastDisabled}
        onPress={() => setCurrentPage(totalPages)}
      >
        <Text style={styles.paginationButtonText}>Last</Text>
      </TouchableOpacity>
    </View>
    <Footer />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollViewContainer: {
    paddingBottom: 100, // Adjust as needed for spacing
  },
  welcomeContainer: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcomeSubtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  paginationButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 10,
  },
  paginationButtonText: {
    color: '#fff',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageIndicator: {
    fontSize: 16,
  },
  chartContainer: {
    marginVertical: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
