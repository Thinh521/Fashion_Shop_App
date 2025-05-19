import {Text, View} from 'react-native';
import React from 'react';
import commonStyles from '../../styles/commonStyles';
import styles from './Placeorder.styles';
import FastImage from 'react-native-fast-image';
import {CouponsIcon, DownIcon} from '../../assets/icons/Icons';
import {TextButton, Button} from '../../components/ui/button/Button';
import {useNavigation, useRoute} from '@react-navigation/core';

const PlaceorderScreen = () => {
  const {product} = useRoute().params;
  const navigation = useNavigation();

  const handleShipping = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Shipping',
    });
  };

  return (
    <View style={[commonStyles.screenContainer, styles.background]}>
      <View style={styles.productItemContainer}>
        <View style={[commonStyles.row, styles.productContainer]}>
          <FastImage
            style={styles.image}
            resizeMode="cover"
            source={product.images[0]}
          />

          <View style={styles.detailsContainer}>
            <Text style={styles.productName}>{product.productName}</Text>
            <Text style={styles.productDescription}>{product.title}</Text>

            <View style={styles.specsContainer}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Size</Text>
                <View style={styles.specValueContainer}>
                  <Text style={styles.specValue}>42</Text>
                  <DownIcon style={styles.dropdownIcon} />
                </View>
              </View>

              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Qty</Text>
                <View style={styles.specValueContainer}>
                  <Text style={styles.specValue}>1</Text>
                  <DownIcon style={styles.dropdownIcon} />
                </View>
              </View>
            </View>

            <View style={styles.deliveryContainer}>
              <Text style={styles.deliveryText}>Delivery by </Text>
              <Text style={styles.deliveryDate}>10 May 2XXX</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.paymentContainer}>
        <View style={styles.sectionHeader}>
          <View style={commonStyles.row}>
            <CouponsIcon style={styles.couponIcon} />
            <Text style={styles.sectionTitle}>Apply Coupons</Text>
          </View>
          <TextButton text="Select" textStyle={styles.selectButtonText} />
        </View>

        <View style={styles.divider} />

        <View>
          <Text style={styles.sectionTitle}>Order Payment Details</Text>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Order Amount</Text>
            <Text style={styles.paymentValue}>₹7,000.00</Text>
          </View>

          <View style={[styles.paymentRow, {marginBottom: 8}]}>
            <View style={commonStyles.row}>
              <Text style={styles.paymentLabel}>Convenience</Text>
              <TextButton text="Know More" textStyle={styles.linkText} />
            </View>
            <TextButton text="Apply Coupon" textStyle={styles.linkText} />
          </View>

          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Delivery Fee</Text>
            <Text style={styles.freeText}>Free</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View>
          <View style={styles.paymentRow}>
            <Text style={styles.sectionTitle}>Order Total</Text>
            <Text style={styles.paymentValue}>₹7,000.00</Text>
          </View>

          <View style={[commonStyles.row, {justifyContent: 'flex-start'}]}>
            <Text style={styles.paymentLabel}>EMI Available</Text>
            <TextButton text="Details" textStyle={styles.linkText} />
          </View>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <View style={styles.footerRow}>
          <Text style={styles.totalPrice}>₹7,000.00</Text>
          <TextButton text="View Details" textStyle={styles.linkText} />
        </View>
        <Button
          text="Proceed to Payment"
          onPress={handleShipping}
          buttonStyle={{backgroundColor: '#F83758', borderRadius: 4}}
          width="100%"
          height={55}
          textStyle={{fontSize: 17, fontWeight: '600'}}
        />
      </View>
    </View>
  );
};

export default PlaceorderScreen;
