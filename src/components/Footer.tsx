import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Footer = () => {
  const navigation = useNavigation(); // Get navigation object
  const [modalVisible, setModalVisible] = useState(false); // State to manage modal visibility

  // Function to handle navigation
  const handleProfileNavigation = (page) => {
    setModalVisible(false); // Close the modal
    navigation.navigate(page); // Navigate to the selected page
  };

  return (
    <View style={styles.footer}>
      <View style={styles.footerLinks}>
        {/* Home Button */}
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
          <Icon name="home" size={28} color="gray" />
        </TouchableOpacity>
        
        {/* Categories Button */}
        <TouchableOpacity onPress={() => navigation.navigate('CategoriesPage')}>
          <Icon name="list" size={28} color="gray" />
        </TouchableOpacity>

        {/* Profile Button */}
      
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
          <Icon name="user" size={28} color="gray" />
        </TouchableOpacity>
        {/* Location Button */}
        <TouchableOpacity onPress={() => navigation.navigate('WishlistPage')}>
          <Icon name="heart" size={28} color="gray" />
        </TouchableOpacity>

        {/* Try at Home Button */}
        <TouchableOpacity onPress={() => navigation.navigate('CartPage')}>
          <Icon name="shopping-cart" size={28} color="gray" />
        </TouchableOpacity>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
 
  closeButton: {
    color: 'red',
    marginTop: 20,
  },
});

export default Footer;
