import React, {useCallback} from 'react';
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
import commonStyles from '../../../styles/commonStyles';

const ProductCard = ({item, width, isWishlisted, isLoading, onPress}) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const {width: windowWidth} = useWindowDimensions();
  const productItemWidth = width || (windowWidth - 42) / 2;

  const getDiscountedPrice = useCallback((price, discountPercentage) => {
    const parsedPrice = parseFloat(price) || 0;
    const discount = parseFloat(discountPercentage) || 0;
    const discounted = parsedPrice - (parsedPrice * discount) / 100;
    return discounted.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  }, []);

  if (isLoading) {
    return (
      <SkeletonPlaceholder borderRadius={8} speed={800}>
        <View style={[styles.card, {width: productItemWidth}]}>
          {/* Ảnh */}
          <View style={styles.productImageContainer}>
            <SkeletonPlaceholder.Item
              width={productItemWidth}
              height={scale(124)}
              borderRadius={4}
            />
          </View>

          {/* Thông tin sản phẩm */}
          <View style={{padding: scale(10)}}>
            <SkeletonPlaceholder.Item
              width={productItemWidth * 0.6}
              height={FontSizes.regular}
              marginBottom={scale(8)}
            />
            <SkeletonPlaceholder.Item
              width={productItemWidth * 0.8}
              height={FontSizes.small}
              marginBottom={scale(8)}
            />
            <SkeletonPlaceholder.Item
              width={productItemWidth * 0.5}
              height={FontSizes.semiLarge}
              marginBottom={scale(6)}
            />
            <View style={styles.priceContainer}>
              <SkeletonPlaceholder.Item
                width={productItemWidth * 0.3}
                height={FontSizes.medium}
                marginRight={scale(10)}
              />
              <SkeletonPlaceholder.Item
                width={productItemWidth * 0.3}
                height={FontSizes.medium}
              />
            </View>
            <View style={commonStyles.rowSpaceBetween}>
              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {Array(5)
                    .fill(0)
                    .map((_, starIndex) => (
                      <SkeletonPlaceholder.Item
                        key={starIndex}
                        width={scale(12)}
                        height={scale(12)}
                        marginRight={scale(2)}
                      />
                    ))}
                </View>
              </View>
              <SkeletonPlaceholder.Item
                width={productItemWidth * 0.2}
                height={FontSizes.small}
              />
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
          source={{
            uri: item.thumbnail,
            priority: FastImage.priority.normal,
          }}
          style={styles.productImage}
          resizeMode={FastImage.resizeMode.cover}
          fallback
        />
        <View style={styles.productWishlist}>
          <WishListIcon color={isWishlisted ? 'red' : '#000'} />
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={1}>
          {item.title || item.productName || 'Không có tên'}
        </Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.description || 'Không có mô tả'}
        </Text>
        <Text style={styles.currentPrice}>
          {item.price && item.discountPercentage
            ? getDiscountedPrice(item.price, item.discountPercentage)
            : item.price?.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }) || 'Liên hệ'}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>
            {item.price?.toLocaleString('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }) || 'Liên hệ'}
          </Text>
          {item.discountPercentage && (
            <Text style={styles.discount}>{item.discountPercentage}% Off</Text>
          )}
        </View>
        <View style={commonStyles.rowSpaceBetween}>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => {
                const average = item.rating?.average || item.rating || 0;
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
          </View>
          <Text style={styles.ratingCount}>
            {item.stock ? `${item.stock} Stock` : 'Hết hàng'}
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
      borderColor: theme.border || '#ccc',
      backgroundColor: theme.card || '#fff',
      borderRadius: 8,
      ...Shadows.medium,
      marginBottom: scale(10),
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
      color: theme.text || '#000',
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
      color: theme.text || '#000',
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
