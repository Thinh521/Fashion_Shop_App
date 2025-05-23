import {StyleSheet} from 'react-native';
import {
  BorderRadius,
  FontSizes,
  FontWeights,
  Shadows,
} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const createStyles = theme =>
  StyleSheet.create({
    scrollContainer: {
      marginBlockEnd: scale(20),
    },
    grid: {
      gap: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    card: {
      width: '48%',
      backgroundColor: theme.card,
      borderRadius: BorderRadius.r8,
      overflow: 'hidden',
      ...Shadows.medium,
    },
    productImage: {
      width: '100%',
      height: 'auto',
      aspectRatio: 1,
    },
    productInfo: {
      padding: 10,
    },
    productTitle: {
      color: theme.text,
      fontSize: FontSizes.regular,
      fontWeight: FontWeights.medium,
      marginBottom: 6,
    },
    productDescription: {
      lineHeight: 16,
      color: theme.text,
      fontSize: FontSizes.small,
      fontWeight: FontWeights.regular,
      marginBottom: 8,
    },
    currentPrice: {
      marginBottom: 4,
      color: theme.text,
      fontWeight: FontWeights.bold,
      fontSize: FontSizes.semiLarge,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    originalPrice: {
      color: theme.border, // Sử dụng theme.border thay vì Colors.gray
      fontSize: FontSizes.medium,
      marginRight: 10,
      textDecorationLine: 'line-through',
    },
    discount: {
      color: theme.primary, // Sử dụng theme.primary thay vì #FF6B00
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.bold,
    },
    starIcon: {
      width: 16,
      height: 16,
      marginRight: 2,
    },
    ratingCount: {
      color: theme.border, // Sử dụng theme.border thay vì Colors.gray
      fontSize: FontSizes.small,
    },
    ratingContainer: {
      alignItems: 'center',
    },
    stars: {
      flexDirection: 'row',
      marginRight: 4,
    },
    productImageContainer: {
      position: 'relative',
    },
    productWishlist: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: theme.card, // Thay rgba(0, 0, 0, 0.4) bằng theme.card
      borderRadius: 999,
      padding: 7,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default createStyles;
