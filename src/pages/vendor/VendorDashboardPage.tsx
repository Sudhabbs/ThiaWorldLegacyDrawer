import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';

const VendorDashboardPage = () => {
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    totalOrders: 0,
    weeklySales: 0,
    weeklyProfit: 0,
  });
  const [orderList, setOrderList] = useState([]);
  const [filteredOrderList, setFilteredOrderList] = useState([]); // State for filtered orders
  const [highestProfit, setHighestProfit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const navigation = useNavigation();

  useEffect(() => {
    fetchSalesData();
    fetchOrderList();
  }, []);

  useEffect(() => {
    // Filter order list whenever search query changes
    const filteredData = orderList.filter(order => 
      order.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrderList(filteredData);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [searchQuery, orderList]);

  const fetchSalesData = () => {
    const data = {
      totalSales: 10000,
      totalOrders: 200,
      weeklySales: 2500,
      weeklyProfit: 800,
    };
    setSalesData(data);
  };

  const fetchOrderList = () => {
    const orders = [
      { id: 1, productName: 'Gold Ring', quantity: 2, profit: 300, totalSalesAmount: 1000, date: '2024-10-01' },
      { id: 2, productName: 'Silver Necklace', quantity: 3, profit: 150, totalSalesAmount: 600, date: '2024-10-02' },
      { id: 3, productName: 'Diamond Bracelet', quantity: 1, profit: 500, totalSalesAmount: 1500, date: '2024-10-03' },
      { id: 4, productName: 'Platinum Ring', quantity: 1, profit: 800, totalSalesAmount: 2000, date: '2024-10-04' },
      { id: 5, productName: 'Emerald Pendant', quantity: 1, profit: 400, totalSalesAmount: 1200, date: '2024-10-05' },
    ];

    const highestProfit = Math.max(...orders.map(order => order.profit));
    setHighestProfit(highestProfit);
    setOrderList(orders);
    notifyHighestProfit(highestProfit);
  };

  const notifyHighestProfit = (profit) => {
    Alert.alert('High Profit Notification', `A product has achieved the highest profit of $${profit}!`);
  };

  const handleAddProduct = () => {
    navigation.navigate('AddProductPage');
  };

  const handleViewProducts = () => {
    navigation.navigate('ProductViewPage');
  };

  const renderOrderRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.productName}</Text>
      <Text style={styles.tableCell}>{item.quantity}</Text>
      <Text style={styles.tableCell}>{item.profit}</Text>
      <Text style={styles.tableCell}>{item.totalSalesAmount}</Text>
      <Text style={styles.tableCell}>{item.date}</Text>
    </View>
  );

  // Pagination Logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrderList.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrderList.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Vendor Dashboard" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.pageTitle}>Welcome, Vendor!</Text>

        {/* Search Input */}
       

        {/* Manage Products Section */}
        <View style={styles.dashboardSection}>
          <Text style={styles.sectionTitle}>Manage Your Products</Text>
          <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
            <Text style={styles.buttonText}>Add New Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleViewProducts}>
            <Text style={styles.buttonText}>View Your Products</Text>
          </TouchableOpacity>
        </View>

        {/* Sales Overview Section */}
        <View style={styles.dashboardSection}>
          <Text style={styles.sectionTitle}>Sales Overview</Text>
          <Text>Total Sales: ${salesData.totalSales}</Text>
          <Text>Total Orders: {salesData.totalOrders}</Text>
          <Text>Weekly Sales: ${salesData.weeklySales}</Text>
          <Text>Weekly Profit: ${salesData.weeklyProfit}</Text>
        </View>

        {/* Total Orders List Section */}
        <View style={styles.dashboardSection}>
          <Text style={styles.sectionTitle}>Total Orders</Text>
          <TextInput
          style={styles.searchInput}
          placeholder="Search by product name..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
          {/* Table Headers */}
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Product Name</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Quantity</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Profit</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Total Sales Amount</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Date</Text>
          </View>

          {/* Total Orders Data */}
          <FlatList
            data={currentOrders} // Use currentOrders for pagination
            renderItem={renderOrderRow}
            keyExtractor={(item) => item.id.toString()}
          />

          {/* Pagination Controls */}
          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={handlePrevPage} disabled={currentPage === 1}>
              <Text style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.pageIndicator}>{`Page ${currentPage} of ${totalPages}`}</Text>
            <TouchableOpacity onPress={handleNextPage} disabled={currentPage === totalPages}>
              <Text style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default VendorDashboardPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    paddingBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
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
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    borderWidth: 1,
    padding: 10,
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50', // Green color
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  paginationButton: {
    padding: 10,
    color: '#007BFF',
  },
  disabledButton: {
    color: '#ccc',
  },
  pageIndicator: {
    alignSelf: 'center',
    marginVertical: 10,
  },
});
