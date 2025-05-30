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

const createStyles = theme =>
  StyleSheet.create({
    productDetailContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },

    productDetailSLider: {
      height: 300,
      marginBlockStart: 20,
    },

    sliderButton: {
      position: 'absolute',
      backgroundColor: Colors.white,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      ...Shadows.medium,
    },

    leftButton: {
      left: 10,
    },

    rightButton: {
      right: 10,
    },

    dotContainer: {
      position: 'absolute',
      bottom: 10,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 9999,
      marginHorizontal: 4,
    },

    activeDot: {
      width: 10,
      height: 10,
      backgroundColor: '#F83758',
    },

    inactiveDot: {
      backgroundColor: '#ccc',
    },

    productDetailInfo: {
      padding: 16,
      marginBlockStart: 20,
    },

    colorContainer: {
      marginBlock: 16,
    },

    colorTitle: {
      color: theme.text,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semiBold,
      marginBlockEnd: Spacing.s10,
    },

    colorBox: {
      flexDirection: 'row',
    },

    sizeTitle: {
      color: theme.text,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semiBold,
      marginBlockEnd: 10,
    },

    quantityTitle: {
      color: theme.text,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.semiBold,
    },

    availableContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    sizeBox: {
      flexDirection: 'row',
      marginBlockEnd: 10,
    },

    colorText: {
      marginBottom: scale(8),
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.medium,
    },

    selectedSize: {
      backgroundColor: '#FA7189',
    },

    textSize: {
      color: '#FA7189',
      fontWeight: '500',
    },

    textSizeSelected: {
      color: 'white',
    },

    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    quantityButton: {
      padding: 5,
      borderRadius: 4,
      marginInlineEnd: 0,
      backgroundColor: '#F2F2F2',
      borderWidth: 1,
      borderColor: '#ccc',
    },

    quantityInput: {
      width: 50,
      height: 30,
      borderWidth: 1,
      borderColor: '#ccc',
      fontSize: 14,
      textAlign: 'center',
      backgroundColor: '#fff',
      paddingVertical: 0,
      paddingHorizontal: 5,
    },

    productTitle: {
      color: theme.text,
      fontSize: FontSizes.large,
      fontWeight: FontWeights.semiBold,
      marginBlockEnd: Spacing.s4,
    },

    productSubtitle: {
      color: theme.text,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.regular,
      marginBlockEnd: Spacing.s4,
    },

    ratingContainer: {
      marginBlockEnd: Spacing.s4,
    },

    stars: {
      flexDirection: 'row',
      marginRight: Spacing.s8,
    },

    starIcon: {
      marginRight: 2,
    },

    ratingCount: {
      color: Colors.gray,
      fontSize: FontSizes.medium,
    },

    priceContainer: {
      marginBlockEnd: Spacing.s4,
    },

    originalPrice: {
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.regular,
      textDecorationLine: 'line-through',
      color: Colors.gray,
      marginRight: Spacing.s10,
    },

    discountedPrice: {
      color: theme.text,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.medium,
      marginRight: Spacing.s10,
    },

    discountBadge: {
      color: '#FA7189',
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.bold,
    },

    heartContainer: {
      width: scale(24),
      height: scale(24),
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },

    heart: {
      width: scale(27),
      height: scale(27),
      marginLeft: 2,
    },

    heartAima: {
      position: 'absolute',
      width: scale(100),
      height: scale(100),
      top: '50%',
      left: '50%',
      transform: [{translateX: -scale(50)}, {translateY: -scale(50)}],
    },

    detailsTitle: {
      color: theme.text,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.medium,
      marginBlockEnd: Spacing.s4,
    },

    detailsText: {
      color: theme.text,
      fontSize: FontSizes.small,
      marginBlockEnd: Spacing.s16,
      lineHeight: 16,
    },

    featuresContainer: {
      gap: 10,
    },

    featureItem: {
      borderWidth: 1,
      borderColor: '#828282',
      paddingHorizontal: 5,
      paddingVertical: 5,
      borderRadius: BorderRadius.r4,
    },

    featureText: {
      color: Colors.gray,
      textAlign: 'center',
      fontSize: FontSizes.xsmall,
    },

    footerButton: {
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 10,
    },

    cartButton: {
      backgroundColor: '#0B3689',
      flex: 1,
      height: 40,
      padding: 16,
      borderRadius: 8,
      marginRight: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    iconCart: {
      color: Colors.white,
    },

    buyButton: {
      backgroundColor: '#31B769',
      flex: 1,
      padding: 16,
      borderRadius: 8,
      marginLeft: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

    buttonText: {
      color: Colors.white,
      fontSize: FontSizes.medium,
      fontWeight: FontWeights.bold,
      marginLeft: Spacing.s8,
    },

    colorOption: {
      width: 40,
      height: 40,
      borderRadius: 20,
      margin: 5,
      borderWidth: 2,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    colorCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },

    selectedColor: {
      borderColor: '#000',
      borderWidth: 3,
    },

    footerContainer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.border,
      backgroundColor: theme.card,
    },
    reviewContainer: {
      padding: scale(16),
    },
  });

export default createStyles;
