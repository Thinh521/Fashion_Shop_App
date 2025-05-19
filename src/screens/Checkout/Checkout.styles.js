import {StyleSheet} from 'react-native';
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  Shadows,
  Spacing,
} from '../../theme/theme';
import {scale} from '../../utils/scaling';

export default StyleSheet.create({
  background: {
    paddingTop: scale(20),
    backgroundColor: '#FDFDFD',
  },

  header: {
    gap: scale(5),
    marginBottom: scale(12),
  },

  headerIconContainer: {
    marginRight: scale(5),
  },

  headerTitle: {
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
    backgroundColor: Colors.white,
    ...Shadows.medium,
  },

  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },

  label: {
    marginRight: scale(8),
    fontSize: FontSizes.small,
    fontWeight: FontWeights.medium,
  },

  addressText: {
    lineHeight: scale(20),
    fontSize: FontSizes.small,
    fontWeight: FontWeights.regular,
  },

  addressIconContainer: {
    padding: scale(30),
    borderRadius: BorderRadius.r6,
    backgroundColor: Colors.white,
    ...Shadows.medium,
  },

  title: {
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.semiBold,
    marginBlockEnd: 10,
  },

  itemContainer: {
    padding: 15,
    borderRadius: BorderRadius.r6,
    marginBlockEnd: 20,
    backgroundColor: Colors.white,
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
    fontSize: 14,
    color: '#666',
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
    color: '#000',
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
    borderTopColor: '#BBBBBB',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
