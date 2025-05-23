import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {StartIcon, WishListIcon} from '../../../assets/icons/Icons';
import {Colors, FontSizes, FontWeights, Shadows} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useTheme} from '../../../contexts/ThemeContext';

// Hàm tính giá đã giảm
const getDiscountedPrice = (priceString, discountPercent) => {
  const originalPrice = parseFloat(priceString.replace(/[^\d.]/g, ''));
  const discountedPrice = originalPrice * (1 - discountPercent / 100);
  return `₹${discountedPrice.toFixed(0)}`;
};

const ProductCard = ({item, width, isWishlisted, isLoading, onPress}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {width: windowWidth} = useWindowDimensions();
  const productItemWidth = width || (windowWidth - 42) / 2;

  if (isLoading) {
    return (
      <SkeletonPlaceholder borderRadius={8} speed={800}>
        <View style={[styles.productCard, {width: productItemWidth}]}>
          <View style={styles.productImageContainer}>
            <SkeletonPlaceholder.Item
              width={productItemWidth}
              height={124}
              borderRadius={4}
            />
          </View>
          <View style={styles.productInfo}>
            <SkeletonPlaceholder.Item
              width={100}
              height={14}
              marginBottom={6}
            />
            <SkeletonPlaceholder.Item
              width={120}
              height={12}
              marginBottom={8}
            />
            <SkeletonPlaceholder.Item width={80} height={16} marginBottom={4} />
            <View style={styles.priceContainer}>
              <SkeletonPlaceholder.Item
                width={50}
                height={13}
                marginRight={10}
              />
              <SkeletonPlaceholder.Item width={50} height={13} />
            </View>
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {Array(5)
                  .fill(0)
                  .map((_, starIndex) => (
                    <SkeletonPlaceholder.Item
                      key={starIndex}
                      width={16}
                      height={16}
                      marginRight={2}
                    />
                  ))}
              </View>
              <SkeletonPlaceholder.Item width={40} height={12} />
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.card, {width: productItemWidth}]}
      onPress={() => onPress(item)}>
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
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.productName}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.currentPrice}>
          {getDiscountedPrice(item.price, item.discount)}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>{item.price}</Text>
          <Text style={styles.discount}>{item.discount}% Off</Text>
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
                <StartIcon key={i} fill={fillColor} style={styles.starIcon} />
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
};

const createStyles = theme =>
  StyleSheet.create({
    card: {
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
      borderRadius: 8,
      ...Shadows.medium,
      marginBottom: scale(10),
    },
    productCard: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: '#fff',
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
      color: theme.text,
    },
    productDescription: {
      lineHeight: scale(16),
      marginBottom: scale(6),
      fontSize: FontSizes.small,
      fontWeight: FontWeights.regular,
      color: Colors.gray,
    },
    currentPrice: {
      marginBottom: scale(6),
      fontWeight: FontWeights.bold,
      fontSize: FontSizes.semiLarge,
      color: theme.text,
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
  });

export default ProductCard;
