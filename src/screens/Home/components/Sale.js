import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  BorderRadius,
  Colors,
  FontSizes,
  FontWeights,
  Shadows,
  Spacing,
} from '../../../theme/theme';
import {RightIcon} from '../../../assets/icons/Icons';
import {Button} from '../../../components/ui/button/Button';
import FastImage from 'react-native-fast-image';
import Images from '../../../assets/images/Images';
import {useTheme} from '../../../contexts/ThemeContext';

const Sale = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.saleContainer}>
      <View style={styles.saleImageContainer}>
        <FastImage
          source={Images.common.line_banner_sale}
          style={styles.lineImage}
          resizeMode="contain"
        />
        <FastImage
          source={Images.common.banner_sale_phu}
          style={styles.backgroundEffect}
          resizeMode="contain"
        />
        <FastImage
          source={Images.common.banner_sale}
          style={styles.mainImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.saleContent}>
        <Text style={styles.saleTitle}>Flat and Heels</Text>
        <Text style={styles.saleSubtitle}>Stand a chance to get rewarded</Text>
        <Button
          text="Visit now"
          rightIcon={<RightIcon />}
          buttonStyle={styles.saleButton}
          height={36}
          textStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default Sale;

const createStyles = theme =>
  StyleSheet.create({
    saleContainer: {
      flexDirection: 'row',
      backgroundColor: theme.card,
      borderRadius: BorderRadius.r6,
      marginBlockEnd: Spacing.s20,
      ...Shadows.medium,
    },

    saleImageContainer: {
      width: '40%',
      aspectRatio: 1,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
    },

    lineImage: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 10,
    },

    backgroundEffect: {
      position: 'absolute',
      left: -40,
      width: '100%',
      height: '95%',
      zIndex: 1,
    },

    mainImage: {
      width: '100%',
      height: 108,
      zIndex: 2,
    },

    saleContent: {
      width: '60%',
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingInlineEnd: Spacing.s15,
    },

    saleTitle: {
      color: theme.text,
      lineHeight: 20,
      fontSize: FontSizes.regular,
      fontWeight: FontWeights.medium,
    },

    saleSubtitle: {
      color: theme.text,
      lineHeight: 20,
      marginBlockEnd: Spacing.s10,
      fontSize: FontSizes.xsmall,
      fontWeight: FontWeights.regular,
    },

    saleButton: {
      alignSelf: 'flex-end',
    },
  });
