import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import commonStyles from '../../../styles/commonStyles';
import {ClockIcon, RightIcon} from '../../../assets/icons/Icons';
import {Button} from '../../../components/ui/button/Button';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const Deal = () => {
  const {width: windowWidth} = useWindowDimensions();
  const isSmallScreen = windowWidth < 360;

  return (
    <View
      style={[
        commonStyles.rowSpaceBetween,
        styles.dealContainer,
        {padding: isSmallScreen ? scale(15) : scale(20)},
      ]}>
      <View style={styles.dealHeader}>
        <Text style={styles.dealTitle}>Deal of the Day</Text>
        <View style={[commonStyles.row]}>
          <ClockIcon style={styles.clockIcon} />
          <Text style={styles.countdownText}>22h 55m 20s remaining</Text>
        </View>
      </View>
      <Button
        height={36}
        text="View all"
        rightIcon={<RightIcon />}
        buttonStyle={[styles.buttonView]}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

export default Deal;

const styles = StyleSheet.create({
  dealContainer: {
    marginBlockEnd: scale(20),
    backgroundColor: '#4392F9',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    borderRadius: 8,
  },

  dealHeader: {
    flexDirection: 'column',
  },

  dealTitle: {
    marginBottom: scale(4),
    color: Colors.white,
    fontSize: FontSizes.medium,
    fontWeight: FontWeights.bold,
  },

  clockIcon: {
    marginRight: scale(6),
    width: scale(16),
    height: scale(16),
    color: Colors.white,
  },

  countdownText: {
    color: Colors.white,
    fontSize: FontSizes.small,
  },

  buttonView: {
    borderWidth: 1,
    backgroundColor: 'none',
    alignSelf: 'center',
    borderColor: Colors.white,
    borderRadius: 6,
  },

  buttonText: {
    fontSize: FontSizes.small,
    fontWeight: FontWeights.semiBold,
  },
});
