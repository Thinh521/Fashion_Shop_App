import {StyleSheet} from 'react-native';
import {Shadows} from '../../theme/theme';
import { scale } from '../../utils/scaling';

export default StyleSheet.create({
  scrollContent: {
    padding: scale(16),
  },
  productItemContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    ...Shadows.medium,
  },

  productContainer: {
    gap: 16,
  },

  image: {
    width: 120,
    height: 150,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
    flexShrink: 1,
  },

  productDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    flexShrink: 1,
  },

  specValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F2F2F2',
    borderRadius: 4,
    minWidth: 80,
  },

  specsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 0,
  },

  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  specLabel: {
    fontSize: 14,
    color: '#666666',
  },

  specValue: {
    flexDirection: 'row',
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },

  cartQuantityPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityButton: {
    padding: 6,
    borderRadius: 4,
    marginInlineEnd: 0,
    backgroundColor: '#F2F2F2',
  },

  quantityInput: {
    width: 50,
    height: 29,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#fff',
    paddingVertical: 0,
    paddingHorizontal: 5,
  },

  deliveryText: {
    fontSize: 14,
    color: '#666666',
  },

  deliveryDate: {
    fontWeight: '500',
    color: '#000000',
  },

  paymentContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  couponIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  selectButtonText: {
    color: '#FF6B00',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#666666',
  },
  paymentValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  linkText: {
    color: '#FF6B00',
    fontSize: 14,
    marginLeft: 8,
  },
  freeText: {
    fontSize: 14,
    color: '#00A650',
  },
  footerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '92%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    ...Shadows.medium,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
