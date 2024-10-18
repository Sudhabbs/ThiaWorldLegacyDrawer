import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddVendorPage = ({ route }) => {
  const navigation = useNavigation();

  // Destructure the parameters from the route
  const {
    vendorName = '',
    userName = '',
    requestDate = '',
    promoteDate = '',
    overallProfit = 0,
    onAddVendor,
  } = route.params || {};

  // State management for vendor details
  const [vendorDetails, setVendorDetails] = useState([]);

  useEffect(() => {
    // Simulate fetching vendor data from an email request and a fake API
    const fetchVendorData = () => {
      const fetchedData = [
        { id: '2', vendorName: 'Fake Vendor 1', userName: 'Fake User 1', requestDate: '2024-01-01', overallProfit: 1000 },
        { id: '3', vendorName: 'Fake Vendor 2', userName: 'Fake User 2', requestDate: '2024-02-01', overallProfit: 1500 },
      ];

      setVendorDetails(fetchedData);
    };

    fetchVendorData();
  }, [vendorName, userName, requestDate, overallProfit]);

  // Handle the approval action
//   const handleApprove = (vendor) => {
//     Alert.alert(
//       'Verify Vendor',
//       `Are you sure you want to approve vendor ${vendor.vendorName}?`,
//       [
//         {
//           text: 'Cancel',
//           onPress: () => console.log('Approval canceled'),
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: () => {
//             const newVendor = {
//               id: vendor.id,
//               vendorName: vendor.vendorName,
//               userName: vendor.userName,
//               requestDate: vendor.requestDate,
//             };

//             // Call the function to add vendor
//             onAddVendor(newVendor);

//             // Show success message and navigate back to Vendor Management page
//             Alert.alert('Success', `Vendor ${vendor.vendorName} approved successfully!`, [
//               {
//                 text: 'OK',
//                 onPress: () => navigation.goBack(), // Navigate back after confirming success
//               },
//             ]);

//             // Remove vendor from list
//             setVendorDetails((prevDetails) => prevDetails.filter(v => v.id !== vendor.id));
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };
const handleApprove = (vendor) => {
    Alert.alert(
      'Verify Vendor',
      `Are you sure you want to approve vendor ${vendor.vendorName}?`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Approval canceled'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            // const newVendor = {
            //   id: vendor.id,
            //   vendorName: vendor.vendorName,
            //   userName: vendor.userName,
            //   requestDate: vendor.requestDate,
            // };
            // onAddVendor(newVendor);
            Alert.alert('Success', `Vendor ${vendor.vendorName} approved successfully!`, [
              {
                text: 'OK',
                onPress: () => {
                  navigation.navigate('VendorManagementPage'); // Replace with your actual route name
                },
              },
            ]);
  
            // Remove vendor from the list after navigating
            setVendorDetails((prevDetails) => prevDetails.filter(v => v.id !== vendor.id));
          },
        },
      ],
      { cancelable: false }
    );
  };
  
  // Handle the removal action
//   const handleRemove = (vendorId) => {
//     setVendorDetails((prevDetails) => prevDetails.filter(vendor => vendor.id !== vendorId));
//     Alert.alert('Removed', `Vendor with ID ${vendorId} has been removed.`); // Show removal message
//   };
const handleRemove = (vendorId) => {
    // Check if the vendor exists before trying to remove it
    const vendorExists = vendorDetails.some(vendor => vendor.id === vendorId);
  
    if (vendorExists) {
      setVendorDetails((prevDetails) => prevDetails.filter(vendor => vendor.id !== vendorId));
      Alert.alert('Removed', `Vendor with ID ${vendorId} has been removed.`); // Show removal message
    } else {
      Alert.alert('Error', `Vendor with ID ${vendorId} does not exist.`); // Handle the case if ID mismatch
    }
  };
  // Render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.value}>{item.vendorName}</Text>
      <Text style={styles.value}>{item.userName}</Text>
      <Text style={styles.value}>{item.requestDate}</Text>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.approvedButton} onPress={() => handleApprove(item)}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(item.id)}>
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Details</Text>

      <View style={styles.table}>
        <View style={styles.headerRow}>
          <Text style={styles.headerLabel}>Vendor Name</Text>
          <Text style={styles.headerLabel}>User Name</Text>
          <Text style={styles.headerLabel}>Request Date</Text>
          <Text style={styles.headerLabel}>Actions</Text>
        </View>

        <FlatList
          data={vendorDetails}
          renderItem={renderItem}
          keyExtractor={(item) => item.id} // Use unique ID as the key
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </View>
  );
};

export default AddVendorPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#007BFF',
    padding: 10,
  },
  headerLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center', // Center-align header text
  },
  listContainer: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  value: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'center', // Center-align values
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  approvedButton: {
    backgroundColor: '#28A745', // Green background for approved
    paddingVertical: 12,
    borderRadius: 5,
    marginRight: 10, // Space between buttons
  },
  removeButton: {
    backgroundColor: '#DC3545', // Red background for remove
    paddingVertical: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
