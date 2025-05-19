import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Images from '../../../assets/images/Images';
import commonStyles from '../../../styles/commonStyles';
import {Button} from '../../../components/ui/button/Button';
import {RightIcon} from '../../../assets/icons/Icons';
import {Colors, FontSizes, FontWeights, Shadows} from '../../../theme/theme';
import {isTablet, scale} from '../../../utils/scaling';

const BannerSummer = () => {
  const {height} = useWindowDimensions();
  const bannerHeight = isTablet ? height * 0.5 : height * 0.2;

  return (
    <View style={styles.summerContainer}>
      <FastImage
        source={Images.common.summer}
        style={[styles.summerImage, {height: bannerHeight}]}
        resizeMode="cover"
      />
      <View style={[commonStyles.rowSpaceBetween, styles.summerContent]}>
        <View style={styles.summerBox}>
          <Text style={styles.summerTitle}>New Arrivals</Text>
          <Text style={styles.summerDescription}>Summer'25 Collections</Text>
        </View>
        <Button
          height={36}
          text="View all"
          rightIcon={<RightIcon />}
          buttonStyle={styles.summerButton}
        />
      </View>
    </View>
  );
};

export default React.memo(BannerSummer);

const styles = StyleSheet.create({
  summerContainer: {
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderRadius: 6,
    marginVertical: scale(20),
    overflow: 'hidden',
    ...Shadows.medium,
  },

  summerImage: {
    width: '100%',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },

  summerContent: {
    padding: scale(20),
  },

  summerBox: {
    flexDirection: 'column',
  },

  summerTitle: {
    marginBottom: scale(2),
    fontSize: FontSizes.large,
    fontWeight: FontWeights.medium,
  },

  summerDescription: {
    fontSize: FontSizes.regular,
    fontWeight: FontWeights.regular,
  },

  summerButton: {
    alignSelf: 'center',
  },
});
