import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import commonStyles from '../../../styles/commonStyles';
import {DateIcon, RightIcon} from '../../../assets/icons/Icons';
import {Button} from '../../../components/ui/button/Button';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {scale} from '../../../utils/scaling';

const TrendingProduct = () => {
  return (
    <View style={[commonStyles.rowSpaceBetween, styles.dealContainer]}>
      <View style={styles.dealHeader}>
        <Text style={styles.dealTitle}>Trending Products</Text>
        <View style={[commonStyles.row]}>
          <DateIcon style={styles.clockIcon} />
          <Text style={styles.countdownText}>Last Date 29/02/22</Text>
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

export default TrendingProduct;

const styles = StyleSheet.create({
  dealContainer: {
    marginBlockEnd: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FD6E87',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    borderRadius: 8,
  },

  dealHeader: {
    flexDirection: 'column',
  },

  dealTitle: {
    marginBottom: 4,
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
