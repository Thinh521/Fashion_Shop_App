import {StyleSheet} from 'react-native';
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  Shadows,
  Spacing,
} from '../../../theme/theme';

export default StyleSheet.create({
  scrollContainer: {
    marginBlockEnd: 20,
  },

  grid: {
    gap: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: Colors.white,
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
    padding: Spacing.s10,
  },

  productTitle: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.medium,
    marginBottom: 6,
  },

  productDescription: {
    lineHeight: 16,
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
    marginBottom: 8,
  },

  currentPrice: {
    marginBottom: 4,
    fontWeight: FontWeights.bold,
    fontSize: FontSizes.semiLarge,
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  originalPrice: {
    color: Colors.gray,
    fontSize: FontSizes.medium,
    marginRight: Spacing.s10,
    textDecorationLine: 'line-through',
  },

  discount: {
    color: '#FF6B00',
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
  },

  starIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
  },

  ratingCount: {
    color: Colors.gray,
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 999,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
