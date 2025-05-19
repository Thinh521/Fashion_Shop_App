import React, {useRef, useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  LeftIcon_2,
  RightIcon_2,
  StartIcon,
  WishListIcon,
} from '../../../assets/icons/Icons';
import productData from '../../../data/productData';
import {Colors, FontSizes, FontWeights, Shadows} from '../../../theme/theme';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import {getCurrentUser, getWishList} from '../../../utils/storage';
import {isTablet, scale} from '../../../utils/scaling';
import ProductSliderSkeleton from '../../../components/skeletons/HomeSkeleton/ProductSliderSkeleton';

const ProductSlider_2 = () => {
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const {width} = useWindowDimensions();
  const numColumns = useMemo(() => (isTablet ? 4 : 2), []);
  const ITEM_WIDTH = useMemo(() => {
    return (width - 10 * (numColumns - 1) - 32) / numColumns;
  }, [width, numColumns]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlistedSet, setWishlistedSet] = useState(new Set());

  useFocusEffect(
    useCallback(() => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        const wishlistData = getWishList(currentUser.id);
        setWishlistedSet(new Set(wishlistData.map(item => item.id)));
      } else {
        setWishlistedSet(new Set());
      }
    }, []),
  );

  const getDiscountedPrice = (priceString, discountPercent) => {
    const originalPrice = parseFloat(priceString.replace(/[^\d.]/g, ''));
    const discountedPrice = originalPrice * (1 - discountPercent / 100);
    return `₹${discountedPrice.toFixed(0)}`;
  };

  const scrollToIndex = index => {
    flatListRef.current?.scrollToIndex({animated: true, index});
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < productData.length - 2) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const navigationToProductDetail = useCallback(
    item => {
      navigation.navigate('NoBottomTab', {
        screen: 'ProductDetail',
        params: {product: item},
      });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({item}) => {
      const isWishlisted = wishlistedSet.has(item.id);

      return (
        <TouchableOpacity
          style={[styles.card, {width: ITEM_WIDTH}]}
          onPress={() => navigationToProductDetail(item)}>
          <View style={styles.productImageContainer}>
            <FastImage
              source={item.images[0]}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productWishlist}>
              <WishListIcon color={isWishlisted ? 'red' : '#000'} />
            </View>
          </View>
          <View style={styles.productInfo}>
            <Text
              style={styles.productTitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.productName}
            </Text>
            <Text
              style={styles.productDescription}
              numberOfLines={2}
              ellipsizeMode="tail">
              {item.title}
            </Text>
            <Text style={styles.currentPrice}>
              {getDiscountedPrice(item.price, item.discount)}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>{item.price}</Text>
              <Text style={styles.discount}>{item.discount}%Off</Text>
            </View>
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => {
                  const {average} = item.rating;
                  let fillColor = '#ccc';
                  if (i + 1 <= Math.floor(average)) {
                    fillColor = '#EDB310';
                  } else if (
                    i + 1 === Math.ceil(average) &&
                    !Number.isInteger(average)
                  ) {
                    fillColor = '#EDB31080';
                  }
                  return (
                    <StartIcon
                      key={i}
                      fill={fillColor}
                      style={styles.starIcon}
                    />
                  );
                })}
              </View>
              <Text style={styles.ratingCount}>
                ({item.rating.countRating.toLocaleString()})
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    },
    [wishlistedSet, navigation, ITEM_WIDTH],
  );

  return (
    <>
      {isLoading ? (
        <ProductSliderSkeleton />
      ) : (
        <View style={styles.container}>
          <FlatList
            ref={flatListRef}
            data={productData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 10}} />}
            snapToInterval={ITEM_WIDTH + 10}
            decelerationRate="fast"
            getItemLayout={(data, index) => ({
              length: ITEM_WIDTH + 10,
              offset: (ITEM_WIDTH + 10) * index,
              index,
            })}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / (ITEM_WIDTH + 10),
              );
              setCurrentIndex(index);
            }}
          />

          {currentIndex > 0 && (
            <TouchableOpacity
              style={[styles.navButton, styles.leftButton]}
              onPress={handlePrev}>
              <LeftIcon_2 />
            </TouchableOpacity>
          )}

          {currentIndex < productData.length - 2 && (
            <TouchableOpacity
              style={[styles.navButton, styles.rightButton]}
              onPress={handleNext}>
              <RightIcon_2 />
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  slideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    ...Shadows.medium,
    marginBottom: scale(10),
    marginRight: 0,
  },

  productImageContainer: {
    position: 'relative',
  },

  productImage: {
    width: '100%',
    height: scale(124),
    borderRadius: 4,
  },

  productWishlist: {
    position: 'absolute',
    top: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(4),
    borderRadius: 9999,
    backgroundColor: Colors.white,
    ...Shadows.medium,
  },

  productInfo: {
    padding: scale(10),
  },

  productTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.medium,
    marginBottom: scale(6),
  },

  productDescription: {
    lineHeight: scale(16),
    marginBottom: scale(6),
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
  },

  currentPrice: {
    marginBottom: scale(6),
    fontWeight: FontWeights.bold,
    fontSize: FontSizes.semiLarge,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(6),
  },

  originalPrice: {
    color: Colors.gray,
    fontSize: FontSizes.medium,
    marginRight: scale(10),
    textDecorationLine: 'line-through',
  },

  discount: {
    color: '#FF6B00',
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  stars: {
    flexDirection: 'row',
    marginRight: scale(10),
  },

  starIcon: {
    width: scale(12),
    height: scale(12),
    marginRight: scale(2),
  },

  ratingCount: {
    color: Colors.gray,
    fontSize: FontSizes.small,
  },

  navButton: {
    position: 'absolute',
    top: '45%',
    width: scale(40),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 9999,
    transform: [{translateY: -20}],
    ...Shadows.medium,
  },

  leftButton: {
    left: 0,
  },

  rightButton: {
    right: 0,
  },
});

export default ProductSlider_2;
