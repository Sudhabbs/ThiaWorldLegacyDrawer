// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// const ProductCard = ({ product, onPress }) => {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress}>
//       {/* Product Image on the left */}
//       <Image source={require('./../assets/logo.png')} style={styles.image} />

//       {/* Product Details on the right */}
//       <View style={styles.details}>
//         <Text style={styles.name}>{product.name}</Text>
//         <Text style={styles.description}>{product.description}</Text>
//         <Text style={styles.price}>{product.price}</Text>

//         {/* Add to Cart Button */}
//         <TouchableOpacity style={styles.addToCartButton}>
//           <Text style={styles.buttonText}>Add to Cart</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default ProductCard;

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 5,
//     elevation: 2,
//     width: '100%',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//   },
//   details: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   description: {
//     fontSize: 14,
//     color: '#555',
//     marginVertical: 5,
//   },
//   price: {
//     fontSize: 14,
//     color: '#000',
//     fontWeight: 'bold',
//   },
//   addToCartButton: {
//     marginTop: 10,
//     backgroundColor: '#f76c6c',
//     paddingVertical: 8,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     alignSelf: 'flex-start',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
// });
import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProductCard = ({ name, price, quantity, image, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>

      <Text style={styles.productName}>{name}</Text>
      <Text style={styles.productPrice}>{price}</Text>
      <Text style={styles.productQuantity}>Quantity: {quantity}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
  productQuantity: {
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default ProductCard;
