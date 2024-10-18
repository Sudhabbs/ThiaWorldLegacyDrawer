import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Dimensions  } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing the icon component
import Header from '../../components/Header';
import Footer from '../../components/Footer';
const { width } = Dimensions.get('window'); 
const ContactUsPage = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.formContainer}>
        <Text style={styles.title}>
          <Icon name="mail" size={20} color="black" style={styles.icon} /> Contact Us
        </Text>
        <Text style={styles.content}>
          Enquire Us Your Requirements Or Any Other Scheme Related Questions Submit Your Query Here.{"\n"}{"\n"}
        </Text>

        <TextInput style={styles.input} placeholder="Your Name" />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />

        {/* Extended Message TextInput */}
        <TextInput 
          style={styles.messageInput} 
          placeholder="Message" 
          multiline 
        />

        <Button title="Submit" onPress={() => {}} />

        <Text style={styles.title}>
          <Icon name="call" size={20} color="black" style={styles.icon} /> Get in touch
        </Text>
        <Text style={styles.content}>
          If You Have Queries About Our Product And Schemes Please Feel Free To Contact Us In The Following Methods.
        </Text>

        <Text style={styles.title}>
          <Icon name="location-outline" size={20} color="black" style={styles.icon} /> Our Address
        </Text>
        <Text style={styles.content}>
          No.7, II Floor,{"\n"}
          Bharathy Street, Ist Cross,{"\n"} 
          Anna Nagar Extension,{"\n"} 
          Puducherry – 605013
        </Text>

        <Text style={styles.title}>
          <Icon name="time-outline" size={20} color="black" style={styles.icon} /> Have a questions? Call to us!
        </Text>
        <Text style={styles.content}>
          Office Number: +91 413 2916 916,{"\n"}            
          Mail: Info@Thiaworld.Com
        </Text>
        
        <Text style={styles.title}>
          <Icon name="alarm" size={20} color="black" style={styles.icon} /> Opening Hour
        </Text>
        <Text style={styles.content}>
          Monday – Saturday: 10am – 6pm{"\n"}   
          Sunday: Closed{"\n"}   
        </Text>
      </ScrollView>
      <Footer />
    </View>
  );
};

export default ContactUsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  messageInput: {
    height: 120, // Extended height for message field
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    textAlignVertical: 'top', // Align text to start from the top
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center', // Align icon and text vertically
  },
  icon: {
    marginRight: 10, // Space between icon and text
  },
  content: {
    fontSize: 16,
    padding: 10,
  },
});
