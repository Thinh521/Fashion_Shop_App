import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights, Shadows} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

export default StyleSheet.create({
  scrollContainer: {
    marginBottom: scale(20),
  },

  grid: {
    gap: scale(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 8,
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
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.medium,
    marginBottom: scale(6),
  },

  productDescription: {
    lineHeight: scale(16),
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
    marginBottom: scale(6),
  },

  price: {
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
