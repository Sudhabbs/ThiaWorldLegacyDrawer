import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';

const ProductDetailPage = ({ route, navigation }) => {
  const { product } = route.params; // Destructure product from route params
  const [isInCart, setIsInCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false); // State for wishlist status
  const [relatedProducts, setRelatedProducts] = useState([]); // State for related products

  // Simulating cart and wishlist management
  useEffect(() => {
    // Check if the product is already in the cart
    const cart = []; // Replace with actual cart state
    const foundInCart = cart.find(item => item.id === product.id);
    if (foundInCart) {
      setIsInCart(true);
    }

    // Check if the product is already in the wishlist
    const wishlist = []; // Replace with actual wishlist state
    const foundInWishlist = wishlist.find(item => item.id === product.id);
    if (foundInWishlist) {
      setIsInWishlist(true);
    }

    // Fetch related products (you might want to replace this with an API call)
    const fetchedRelatedProducts = [
      { id: 1, name: 'Related Product 1', price: 29.99, imageUrl: 'https://example.com/image1.jpg' },
      { id: 2, name: 'Related Product 2', price: 19.99, imageUrl: 'https://example.com/image2.jpg' },
    ];
    setRelatedProducts(fetchedRelatedProducts);
  }, [product.id]);

  // const handleAddToCart = () => {
  //   if (isInCart) {
  //     // Navigate to cart
  //     // console.log("Navigating to Cart");
  //     navigation.navigate('CartPage')
  //     ; // Uncomment when you have a CartPage
  //   } else {
  //     // Add product to cart
  //     setIsInCart(true);
  //     console.log("Product added to cart");
  //     // Add product to cart logic goes here
  //   }
  // };
  const handleAddToCart = (item) => {
    if (isInCart) {
      // Navigate to cart and pass the selected item
      navigation.navigate('CartPage', { selectedItem: item });
    } else {
      // Add product to cart
      setIsInCart(true);
      console.log("Product added to cart");
      // Add product to cart logic goes here
      // Here you might also want to store the item in your cart state
    }
  };
  const handleAddToWishlist = () => {
    if (isInWishlist) {
      console.log("Already in Wishlist");
      // Optionally navigate to wishlist page
      navigation.navigate('WishlistPage'); // Uncomment when you have a WishlistPage
    } else {
      // Add product to wishlist
      setIsInWishlist(true);
      console.log("Product added to wishlist");
      // Add product to wishlist logic goes here
    }
  };

  const handleBuyNow = () => {
    // Logic to proceed to checkout
    const selectedItems = [{ ...product, quantity: 1 }];
    // console.log("Proceeding to checkout");
    navigation.navigate('ShippingAddressBuyPage', { selectedItems }); // Uncomment when you have a CheckoutPage
  };

  const renderRelatedProduct = ({ item }) => (
    <TouchableOpacity style={styles.relatedProductCard} onPress={() => navigation.navigate('ProductDetailPage', { product: item })}>
      <Image source={{ uri: item.imageUrl }} style={styles.relatedProductImage} />
      <Text style={styles.relatedProductName}>{item.name}</Text>
      <Text style={styles.relatedProductPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(product)}>
  <Text style={styles.addToCartButtonText}>
    {isInCart ? "View Cart" : "Add to Cart"}
  </Text>
</TouchableOpacity>

        <TouchableOpacity style={isInWishlist ? styles.wishlistButtonDisabled : styles.wishlistButton} onPress={handleAddToWishlist}>
          <Text style={styles.wishlistButtonText}>
            {isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowButtonText}>Buy Now</Text>
        </TouchableOpacity>

        {/* Reviews and Ratings Section */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Customer Reviews</Text>
          <Text style={styles.ratingText}>Rating: 4.5/5 (100 Reviews)</Text>
          <Text style={styles.reviewText}>This product is amazing! Highly recommend it.</Text>
        </View>

        {/* Related Products Section */}
        <View style={styles.relatedProductsContainer}>
          <Text style={styles.relatedProductsTitle}>Related Products</Text>
          <FlatList
            data={relatedProducts}
            renderItem={renderRelatedProduct}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#b12704', // Amazon's price color
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  addToCartButton: {
    backgroundColor: '#ff9900', // Amazon's button color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  wishlistButton: {
    backgroundColor: '#f0c14b', // Light yellow for wishlist button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  wishlistButtonDisabled: {
    backgroundColor: '#d3d3d3', // Grey color for disabled button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  wishlistButtonText: {
    color: '#111', // Dark text for wishlist button
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: '#007185', // Dark blue for Buy Now button
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buyNowButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#555',
  },
  reviewText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  relatedProductsContainer: {
    marginTop: 20,
  },
  relatedProductsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  relatedProductCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    width: 150, // Width of each related product card
    alignItems: 'center',
    elevation: 2, // Shadow for Android
  },
  relatedProductImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  relatedProductName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  relatedProductPrice: {
    fontSize: 14,
    color: '#b12704',
  },
});

export default ProductDetailPage;
