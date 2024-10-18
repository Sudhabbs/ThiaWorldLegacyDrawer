import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, Dimensions, Animated, NativeSyntheticEvent, NativeScrollEvent, ImageSourcePropType } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const { width } = Dimensions.get('window');

type RootStackParamList = {
  HomePage: undefined;
  ProductListingPAge: undefined;
  ProductDetailPage: { productId: string };
};



interface HomePageProps {
  navigation: HomePageNavigationProp;
}

type IconName =
  | 'cart-outline'
  | 'tv-outline'
  | 'shirt-outline'
  | 'fast-food-outline'
  | 'home-outline'
  | 'medkit-outline'
  | 'book-outline'
  | 'game-controller-outline'
  | 'watch-outline'
  | 'fitness-outline'
  | 'search';

interface Category {
  id: string;
  name: string;
  icon: IconName;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: ImageSourcePropType; 
  // image: string;
  inWishlist: boolean;
}

interface Offer {
  id: string;
  title: string;
  description: string;
  // image: string;
  image: ImageSourcePropType;
}

const categories: Category[] = [
  { id: '1', name: 'Groceries', icon: 'cart-outline' },
  { id: '2', name: 'Electronics', icon: 'tv-outline' },
  { id: '3', name: 'Fashion', icon: 'shirt-outline' },
  { id: '4', name: 'Food', icon: 'fast-food-outline' },
  { id: '5', name: 'Furnitures', icon: 'home-outline' },
  { id: '6', name: 'Wellness', icon: 'medkit-outline' },
  { id: '7', name: 'Reads', icon: 'book-outline' },
  { id: '8', name: 'Play', icon: 'game-controller-outline' },
  { id: '9', name: 'Gems', icon: 'watch-outline' },
  { id: '10', name: 'Sports', icon: 'fitness-outline' },
];

const featuredProducts: Product[] = [  
  { id: '1', name: 'iPhone 12', price: '₹79,900', image: require('./../assets/logo.png'), inWishlist: false },
  { id: '2', name: 'Running Shoes', price: '₹9,999', image: require('./../assets/logo.png'), inWishlist: false },
  { id: '3', name: 'Leather Jacket', price: '₹18,500', image: require('./../assets/logo.png'), inWishlist: false },
  { id: '4', name: 'Smart TV', price: '₹45,000', image: require('./../assets/logo.png'), inWishlist: false },
];

const promotionalOffers: Offer[] = [
  { id: '1', title: 'Summer Sale', description: 'Up to 50% off on summer collections!', image: require('./../assets/logo.png') },
  { id: '2', title: 'New Arrivals', description: 'Check out the latest products in electronics.', image: require('./../assets/logo.png') },
];

const heroBannerImages = [
  { id: '1', image:require('./../assets/logo.png'), title: 'Super Sale!' },
  { id: '2', image: require('./../assets/logo.png'), title: 'Latest Gadgets' },
  { id: '3', image: require('./../assets/logo.png'), title: 'Fashion Deals' },
];

const HomePageBBS: React.FC<HomePageProps> = ({ navigation }) => {
  // const navigation = useNavigation<HomePageNavigationProp>();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState(featuredProducts);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % heroBannerImages.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: width * nextIndex,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.floor(event.nativeEvent.contentOffset.x / width);
        setCurrentIndex(index);
      },
    }
  );

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {heroBannerImages.map((_, i) => {
          let opacity = scrollX.interpolate({
            inputRange: [(i - 1) * width, i * width, (i + 1) * width],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={i} style={[styles.dot, { opacity }]} />;
        })}
      </View>
    );
  };

  const toggleWishlist = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, inWishlist: !product.inWishlist }
          : product
      )
    );
  };

  // const toggleWishlist = (productId: string) => {
  //   const productIndex = featuredProducts.findIndex((product) => product.id === productId);
  //   if (productIndex !== -1) {
  //     featuredProducts[productIndex].inWishlist = !featuredProducts[productIndex].inWishlist;
  //   }
  // };

  const goToProductDetails = (productId: string) => {
    navigation.navigate('ProductDetailPage', { productId });
  };

  const navigateToProducts = () => {
    navigation.navigate('ProductListingAllPage'); // Correct navigation
  };

  const renderFeaturedProducts = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
    <Image source={item.image} style={styles.productImage}  resizeMode="contain"/>
    <View style={styles.productDetails}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </View>
    <View style={styles.iconContainer}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => toggleWishlist(item.id)}
      >
        <Ionicons
          name={item.inWishlist ? 'heart' : 'heart-outline'}
          size={20}
          color={item.inWishlist ? 'red' : '#333'}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => console.log('Add to Cart', item.id)}
      >
        <Ionicons name="cart-outline" size={20} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => goToProductDetails(item.id)}
      >
        <Ionicons name="eye-outline" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  </View>
  );

  const renderFooter = () => (
  
    <TouchableOpacity onPress={navigateToProducts}>
      <Text style={styles.viewMoreLink}>View More</Text>
    </TouchableOpacity>
  
  );

  return (
    <ScrollView style={styles.container}>
    <Text style={styles.sectionTitle}>Categories</Text>

<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
  {categories.map((category) => (
    <View key={category.id} style={styles.categoryCard}>
      <Ionicons name={category.icon} size={30} color="#96B416" />
      <Text style={styles.categoryText}>{category.name}</Text>
    </View>
  ))}
</ScrollView>
      {/* <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="#333" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View> */}

      {/* Hero Banner (Image Slider) */}
      <View style={styles.heroBanner}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
        >
          {heroBannerImages.map((item) => (
            <View key={item.id} style={styles.slide}>
              <Image source={item.image} style={styles.bannerImage} />
              {/* <View style={styles.bannerTextContainer}>
                <Text style={styles.bannerText}>{item.title}</Text>
              </View> */}
            </View>
          ))}
        </ScrollView>
        {renderPagination()}
      </View>

      

      <Text style={styles.sectionTitle}>Featured Products</Text>
      <FlatList
        horizontal
        data={featuredProducts}
        keyExtractor={(item) => item.id}
       renderItem={renderFeaturedProducts}
       ListFooterComponent={renderFooter}
      />

      <Text style={styles.sectionTitle}>Promotional Offers</Text>
      <FlatList
        horizontal
        data={promotionalOffers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.offerCard}>
            <Image source={item.image} style={styles.offerImage} />
            <View style={styles.offerDetails}>
              <Text style={styles.offerTitle}>{item.title}</Text>
              <Text style={styles.offerDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  heroBanner: {
    height: 200,
    marginBottom: 20,
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: 200,
  },
  bannerTextContainer: {
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  bannerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  horizontalScroll: {
    marginHorizontal: 16,
    marginBottom: 5,
  },
  categoryCard: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    padding: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 0.5,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  productCard: {
    width: 160,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    overflow: 'hidden',
    elevation: 5,
  },
  productImage: {
    // width: 120,
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,  // Rounded top corners
    borderTopRightRadius: 10,
    borderRadius: 10,
  },
  productDetails: {
    marginTop: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    justifyContent: 'space-between',
  },
  iconButton: {
    padding: 5,
  },
  viewMoreLink: {
    // color: '#96B416', // Customizable link color
    color: '#000', // Customizable link color
    fontSize: 16,
    marginVertical: 10,
    textDecorationLine: 'underline', // Makes it look like a hyperlink
    paddingHorizontal: 10,
    paddingVertical: 100,    
  },
  // viewMoreButton: {
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#96B416',  // Customizable button color
  //   padding: 10,
  //   borderRadius: 8,
  //   margin: 10,
  // },
  // viewMoreText: {
  //   color: '#fff',
  //   fontSize: 12,
  //   marginRight: 5,
  // },
  offerCard: {  
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: 'hidden',
    elevation: 5
  },
  offerImage: {
    // width: 150,
    width: '100%',
    height: 150,
  },
  offerDetails: {
    marginTop: 10,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  offerDescription: {
    fontSize: 14,
    color: '#333',
  },
});

export default HomePageBBS;
