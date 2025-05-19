import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  background: {
    backgroundColor: '#F8F8F8',
    padding: 16,
  },
  productItemContainer: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  specsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 12,
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
  specValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  specValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  dropdownIcon: {
    width: 16,
    height: 16,
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
  proceedButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 8,
    paddingVertical: 14,
  },
  proceedButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
