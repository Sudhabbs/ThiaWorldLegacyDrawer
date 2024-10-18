import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfilePage = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userRole, setUserRole] = useState('Customer'); // Set this based on user authentication
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false); // State for profile info modal
  const [personalData, setPersonalData] = useState({
    mobile: '123-456-7890', // Example data, replace with fetched data
    email: 'john.doe@example.com',
    address: '123 Main St',
  });
  
  const [userData, setUserData] = useState({
    name: 'John Doe',
    mobile: '123-456-7890',
    email: 'john.doe@example.com',
    address: '123 Main St',
    userType: 'Customer', // Example data, replace with fetched data
  });

  const handleLogout = () => {
    // Perform logout actions here
    setIsLoggedIn(false);
    alert('Logged out successfully!');
  };

  const handleEdit = () => {
    // Logic to save edited data
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      {/* Profile Header */}
      <View style={styles.header}>
        {isLoggedIn ? (
          <>
            <Image
              source={{
                uri: 'https://your-image-url.com/profile-pic.jpg', // Replace with profile picture URL
              }}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>{userData.name}</Text>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.profileName}>Logged Out</Text>
        )}
      </View>
      {/* User Type Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Type</Text>
        <Text style={styles.userTypeText}>{userRole}</Text>
        <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('BecomeVendorScreen')}
            >
             
              <Text style={styles.userTypeText}>Register As a Vendor</Text>
            </TouchableOpacity>
      </View>
      
      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        {isLoggedIn ? (
          <>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setProfileModalVisible(true)} 
            >
              <Icon name="person-circle" size={20} color="gray" />
              <Text style={styles.optionText}>Profile Information</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('WishlistPage')}
            >
              <Icon name="heart" size={20} color="gray" />
              <Text style={styles.optionText}>Wishlist</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('OrderHistoryPage')}
            >
              <Icon name="file-tray-full" size={20} color="gray" />
              <Text style={styles.optionText}>Order History</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('TrackOrderPage')}
            >
              <Icon name="locate" size={20} color="gray" />
              <Text style={styles.optionText}>Track Order</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('CartPage')}
            >
              <Icon name="card" size={20} color="gray" />
              <Text style={styles.optionText}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('LoyaltyProgramPage')}
            >
              <Icon name="card" size={20} color="gray" />
              <Text style={styles.optionText}>LoyaltyCard</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.loginPrompt}>
            <Text style={styles.loginText}>Please log in to access your account.</Text>
            <Button title="Log In" onPress={() => navigation.navigate('LoginPage')} color="#f76c6c" />
          </View>
        )}
      </View>
      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('FAQPage')}
        >
          <Icon name="help-circle" size={20} color="gray" />
          <Text style={styles.optionText}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('AboutUsPage')}
        >
          <Icon name="information-circle" size={20} color="gray" />
          <Text style={styles.optionText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ContactUsPage')}
        >
          <Icon name="call" size={20} color="gray" />
          <Text style={styles.optionText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('TermsAndConditionsPage')}
        >
          <Icon name="document-text" size={20} color="gray" />
          <Text style={styles.optionText}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('PrivacyPolicyPage')}
        >
          <Icon name="shield-checkmark" size={20} color="gray" />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
      {/* Sign Out */}
      {isLoggedIn && (
        <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      )}
      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Personal Data</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              value={personalData.mobile}
              onChangeText={(text) => setPersonalData({ ...personalData, mobile: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={personalData.email}
              onChangeText={(text) => setPersonalData({ ...personalData, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={personalData.address}
              onChangeText={(text) => setPersonalData({ ...personalData, address: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Profile Information Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => setProfileModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Profile Information</Text>
            <Text style={styles.modalText}><strong>Name:</strong> {userData.name}</Text>
            <Text style={styles.modalText}><strong>Mobile:</strong> {userData.mobile}</Text>
            <Text style={styles.modalText}><strong>Email:</strong> {userData.email}</Text>
            <Text style={styles.modalText}><strong>Address:</strong> {userData.address}</Text>
            <Text style={styles.modalText}><strong>User Type:</strong> {userData.userType}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setProfileModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    elevation: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editProfileButton: {
    marginTop: 10,
    backgroundColor: '#5cb85c',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  editProfileText: {
    color: '#fff',
    fontSize: 16,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  userTypeText: {
    fontSize: 16,
    marginVertical: 10,
  },
  signOutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#5cb85c',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#d9534f',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#5cb85c',
    fontSize: 16,
  },
  loginPrompt: {
    alignItems: 'center',
  },
  loginText: {
    marginBottom: 10,
  },
});

export default ProfilePage;
