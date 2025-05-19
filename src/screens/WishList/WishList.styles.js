import {StyleSheet} from 'react-native';
import {Colors, FontSizes, FontWeights, Shadows} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  searchContainer: {
    marginBlock: scale(20),
  },

  searchInput: {
    height: scale(48),
    borderRadius: 10,
    backgroundColor: Colors.background,
  },

  sectionHeader: {
    marginBottom: scale(20),
  },

  sectionTitle: {
    fontWeight: FontWeights.bold,
    fontSize: FontSizes.semiLarge,
  },

  actionsContainer: {
    gap: scale(12),
    flexDirection: 'row',
  },

  actionButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: scale(6),
    paddingHorizontal: scale(10),
    backgroundColor: Colors.white,
    borderRadius: 6,
  },

  actionIcon: {
    width: scale(16),
    height: scale(16),
    marginLeft: scale(4),
  },

  actionText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },

  wsihlistContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

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

  productInfo: {
    padding: scale(10),
  },

  name: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.medium,
    marginBottom: scale(6),
  },

  title: {
    lineHeight: scale(16),
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
    marginBottom: scale(8),
  },

  price: {
    marginBottom: scale(4),
    fontSize: FontSizes.semiLarge,
    fontWeight: FontWeights.semiBold,
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
  },
});
