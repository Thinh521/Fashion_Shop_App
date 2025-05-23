import {StyleSheet} from 'react-native';
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  Shadows,
} from '../../theme/theme';
import {scale} from '../../utils/scaling';

const createStyles = theme =>
  StyleSheet.create({
    background: {
      flex: 1,
      padding: scale(16),
      backgroundColor: theme.background,
    },

    header: {
      gap: scale(5),
      marginBottom: scale(12),
    },

    headerIconContainer: {
      marginRight: scale(5),
    },

    headerTitle: {
      color: theme.text,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semiBold,
    },

    addressContainer: {
      gap: scale(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    addressContent: {
      flex: 1,
      padding: 15,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
      ...Shadows.medium,
    },

    addressHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: scale(8),
    },

    label: {
      color: theme.text,
      marginRight: scale(8),
      fontSize: FontSizes.small,
      fontWeight: FontWeights.medium,
    },

    addressText: {
      color: theme.text,
      lineHeight: scale(20),
      fontSize: FontSizes.small,
      fontWeight: FontWeights.regular,
    },

    addressIconContainer: {
      padding: scale(30),
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: BorderRadius.r6,
      backgroundColor: theme.card,
      ...Shadows.medium,
    },

    title: {
      color: theme.text,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semiBold,
      marginBlockEnd: 10,
    },

    itemContainer: {
      padding: 15,
      borderRadius: BorderRadius.r6,
      marginBlockEnd: 20,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
      ...Shadows.medium,
    },

    shopContainer: {
      marginTop: 20,
    },

    productContainer: {
      gap: 20,
      marginBottom: 10,
    },

    productsScrollView: {
      maxHeight: 450,
    },
    productsScrollContent: {
      paddingBottom: 20,
    },

    image: {
      width: 130,
      height: 125,
      borderRadius: BorderRadius.r6,
    },

    detailsContainer: {
      flex: 1,
    },

    productName: {
      color: theme.text,
      marginBottom: 4,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semiBold,
    },

    variationsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },

    variationsLabel: {
      color: theme.text,
      fontSize: 14,
      marginRight: 8,
    },

    colorOption: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      backgroundColor: '#f5f5f5',
      marginRight: 8,
    },

    colorText: {
      fontSize: 12,
    },

    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    ratingText: {
      color: theme.text,
      fontSize: 14,
      marginRight: 4,
    },
    stars: {
      flexDirection: 'row',
    },
    starIcon: {
      marginRight: 2,
    },
    priceContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    currentPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
      marginRight: 12,
    },
    discountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    discountText: {
      fontSize: 12,
      color: '#ff0000',
      marginRight: 8,
    },
    originalPrice: {
      fontSize: 12,
      color: '#999',
      textDecorationLine: 'line-through',
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: theme.border,
      paddingTop: 12,
      marginTop: 8,
    },
    totalLabel: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
    totalPrice: {
      color: theme.text,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default createStyles;
