import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { DataTable } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
const VendorManagementPage = () => {
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    fetchVendorData(); // Fetch vendor data on component mount
  }, []);

  useEffect(() => {
    filterVendors();
  }, [searchQuery, vendors]);

  const fetchVendorData = async () => {
    setLoading(true); // Start loading
    try {
      // Mock vendor data fetching
      const data = [
        { id: 1, vendorName: 'Vendor A', userName: 'User A', requestDate: '2024-01-01', promoteDate: '2024-01-10', overallProfit: 5000 },
        { id: 2, vendorName: 'Vendor B', userName: 'User B', requestDate: '2024-01-02', promoteDate: '2024-01-11', overallProfit: 4000 },
        { id: 3, vendorName: 'Vendor C', userName: 'User C', requestDate: '2024-01-03', promoteDate: '2024-01-12', overallProfit: 3000 },
        { id: 4, vendorName: 'Vendor D', userName: 'User D', requestDate: '2024-01-04', promoteDate: '2024-01-13', overallProfit: 2000 },
        { id: 5, vendorName: 'Vendor E', userName: 'User E', requestDate: '2024-01-05', promoteDate: '2024-01-14', overallProfit: 1500 },
        { id: 6, vendorName: 'Vendor F', userName: 'User F', requestDate: '2024-01-06', promoteDate: '2024-01-15', overallProfit: 1000 },
        { id: 7, vendorName: 'Vendor G', userName: 'User G', requestDate: '2024-01-07', promoteDate: '2024-01-16', overallProfit: 600 },
        { id: 8, vendorName: 'Vendor H', userName: 'User H', requestDate: '2024-01-08', promoteDate: '2024-01-17', overallProfit: 400 },
        { id: 9, vendorName: 'Vendor I', userName: 'User I', requestDate: '2024-01-09', promoteDate: '2024-01-18', overallProfit: 300 },
        { id: 10, vendorName: 'Vendor J', userName: 'User J', requestDate: '2024-01-10', promoteDate: '2024-01-19', overallProfit: 200 },
        { id: 11, vendorName: 'Vendor K', userName: 'User K', requestDate: '2024-01-11', promoteDate: '2024-01-20', overallProfit: 100 },
        { id: 12, vendorName: 'Vendor L', userName: 'User L', requestDate: '2024-01-12', promoteDate: '2024-01-21', overallProfit: 50 },
      ];
      setVendors(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const filterVendors = () => {
    const filtered = vendors.filter(vendor =>
      vendor.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVendors(filtered);
    setCurrentPage(0); // Reset to the first page on search
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * rowsPerPage < filteredVendors.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(0); // Reset to the first page on change
  };

  return (
    <View style={styles.container}>
      <Header title="Vendor Management" />
      <ScrollView>
        <Text style={styles.pageTitle}>Vendor Management</Text>
        <View style={styles.buttonContainer}>
          <Button title="Add New Vendor" onPress={() => navigation.navigate('AddVendorPage')} />
        </View>
        <View style={styles.searchContainer}>
  <TextInput
    style={styles.searchInput}
    placeholder="Search Vendors..."
    value={searchQuery}
    onChangeText={handleSearch}
  />
  <Picker
    selectedValue={rowsPerPage}
    style={styles.picker}
    onValueChange={handleRowsPerPageChange}>
    <Picker.Item label="5" value={5} />
    <Picker.Item label="10" value={10} />
    <Picker.Item label="20" value={20} />
    <Picker.Item label="50" value={50} />
    <Picker.Item label="All" value={filteredVendors.length} />
  </Picker>
</View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Vendor Name</DataTable.Title>
              <DataTable.Title>User Name</DataTable.Title>
              <DataTable.Title>Request Date</DataTable.Title>
              <DataTable.Title>Promote Date</DataTable.Title>
              <DataTable.Title>Overall Profit</DataTable.Title>
            </DataTable.Header>

            <FlatList
              data={filteredVendors.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <DataTable.Row>
                  <DataTable.Cell>{item.vendorName}</DataTable.Cell>
                  <DataTable.Cell>{item.userName}</DataTable.Cell>
                  <DataTable.Cell>{item.requestDate}</DataTable.Cell>
                  <DataTable.Cell>{item.promoteDate}</DataTable.Cell>
                  <DataTable.Cell>${item.overallProfit}</DataTable.Cell>
                </DataTable.Row>
              )}
            />

            <DataTable.Pagination
              page={currentPage + 1}
              numberOfPages={Math.ceil(filteredVendors.length / rowsPerPage)}
              onPageChange={(page) => setCurrentPage(page - 1)}
              label={`${(currentPage * rowsPerPage) + 1}-${Math.min((currentPage + 1) * rowsPerPage, filteredVendors.length)} of ${filteredVendors.length}`}
            />
          </DataTable>
        )}

        <View style={styles.navigationButtons}>
          <Button title="Previous" onPress={handlePrevPage} disabled={currentPage === 0} />
          <Button title="Next" onPress={handleNextPage} disabled={(currentPage + 1) * rowsPerPage >= filteredVendors.length} />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default VendorManagementPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusts spacing between elements
    margin: 20,
  },
  searchInput: {
    flex: 1, // Allow the TextInput to take up available space
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10, // Add space between TextInput and Picker
  },
  picker: {
    height: 50,
    width: 120, // Adjust width as needed
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
  },
  // searchInput: {
  //   margin: 20,
  //   padding: 10,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 5,
  // },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  // picker: {
  //   margin: 20,
  //   height: 50,
  //   width: 150,
  // },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
});
