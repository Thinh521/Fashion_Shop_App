import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Images from '../../../assets/images/Images';
import commonStyles from '../../../styles/commonStyles';
import {RightIcon_2} from '../../../assets/icons/Icons';
import {Colors, FontSizes, FontWeights, Shadows} from '../../../theme/theme';
import {isTablet, scale} from '../../../utils/scaling';

const bannerHeight = isTablet
  ? Dimensions.get('window').height * 0.5
  : Dimensions.get('window').height * 0.3;

const BannerSponsored = () => {
  return (
    <View style={styles.sponsoredContainer}>
      <Text style={styles.sponsoredTitle}>Sponsored</Text>
      <View>
        <View style={styles.sponsoredImageContainer}>
          <FastImage
            source={Images.common.sponserd}
            style={styles.sponsoredImage}
            resizeMode="cover"
          />
        </View>

        <View style={[commonStyles.rowSpaceBetween, styles.sponsoredContent]}>
          <Text style={styles.sponsoredDiscount}>up to 50% Off</Text>
          <View style={styles.sponsoredRightIcon}>
            <RightIcon_2 style={styles.sponsoredIcon} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(BannerSponsored);

const styles = StyleSheet.create({
  sponsoredContainer: {
    flexDirection: 'column',
    borderRadius: 12,
    ...Shadows.medium,
    padding: scale(20),
    backgroundColor: Colors.white,
    marginBottom: scale(20),
  },

  sponsoredTitle: {
    marginBottom: scale(10),
    fontSize: FontSizes.large,
    fontWeight: FontWeights.medium,
  },

  sponsoredImageContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },

  sponsoredContent: {
    marginTop: scale(10),
  },

  sponsoredImage: {
    width: '100%',
    height: bannerHeight,
    borderRadius: 8,
  },

  sponsoredDiscount: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.bold,
  },

  sponsoredRightIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  sponsoredIcon: {
    width: scale(24),
    height: scale(24),
  },
});
