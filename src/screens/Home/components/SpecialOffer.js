import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Images from '../../../assets/images/Images';
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  Shadows,
} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';
import {useTheme} from '../../../contexts/ThemeContext';

const SpecialOffer = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.specialOfferCard}>
      <View style={styles.imageWrapper}>
        <FastImage
          source={Images.common.specialoffers}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.specialoffersHeader}>
          <Text style={styles.specialoffersTitle}>Special Offers</Text>
          <FastImage
            source={Images.common.home_icon}
            style={styles.specialOffersIcon}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.specialOffersDescription}>
          We make sure you get the{'\n'}offer you need at best prices
        </Text>
      </View>
    </View>
  );
};

export default SpecialOffer;

const createStyles = theme =>
  StyleSheet.create({
    specialOfferCard: {
      flexDirection: 'row',
      backgroundColor: theme.card,
      borderRadius: BorderRadius.r6,
      padding: scale(20),
      marginVertical: scale(20),
      ...Shadows.medium,
    },

    imageWrapper: {
      width: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    image: {
      width: scale(75),
      height: scale(60),
    },

    contentWrapper: {
      width: '60%',
      paddingLeft: scale(16),
      justifyContent: 'center',
    },

    specialoffersHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },

    specialoffersTitle: {
      color: theme.text,
      fontSize: FontSizes.regular,
      fontWeight: FontWeights.medium,
      marginRight: 8,
    },

    specialOffersIcon: {
      width: scale(20),
      height: scale(20),
    },

    specialOffersDescription: {
      color: theme.text,
      lineHeight: scale(16),
      fontSize: FontSizes.small,
      fontWeight: FontWeights.light,
    },
  });
