import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights, Shadows} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const createStyles = theme =>
  StyleSheet.create({
    grid: {
      gap: scale(10),
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },

    card: {
      width: '46%',
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
      borderRadius: 8,
      marginBottom: scale(12),
      overflow: 'hidden',
      ...Shadows.medium,
    },

    productImage: {
      width: '100%',
      height: 'auto',
      aspectRatio: 1,
    },

    productInfo: {
      padding: scale(10),
    },

    productTitle: {
      color: theme.text,
      fontSize: FontSizes.regular,
      fontWeight: FontWeights.medium,
      marginBottom: scale(6),
    },

    productDescription: {
      color: theme.text,
      lineHeight: scale(16),
      fontSize: FontSizes.small,
      fontWeight: FontWeights.regular,
      marginBottom: scale(6),
    },

    price: {
      color: theme.text,
      marginBottom: scale(4),
      fontWeight: FontWeights.bold,
      fontSize: FontSizes.semiLarge,
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

    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    stars: {
      flexDirection: 'row',
      marginRight: scale(4),
    },

    productImageContainer: {
      position: 'relative',
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
  });

export default createStyles;
