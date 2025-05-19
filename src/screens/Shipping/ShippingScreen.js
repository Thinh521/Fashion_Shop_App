import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from '../../components/ui/button/Button';
import SuccessModal from '../../components/ui/modal/SuccessModal';
import Images from '../../assets/images/Images';

const ShippingScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePayment = () => {
    setIsModalVisible(true);

    setTimeout(() => {
      setIsModalVisible(false);
    }, 2000);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Order Summary Section */}
      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Order</Text>
          <Text style={styles.value}>₹7,000</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Shipping</Text>
          <Text style={styles.value}>₹30</Text>
        </View>
        <View style={[styles.row, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹7,030</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Payment Methods Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Payment</Text>

        {['visa', 'paypal', 'master', 'applepay'].map(method => (
          <View key={method} style={styles.paymentMethod}>
            <FastImage
              source={Images.common[method]}
              style={styles.paymentIcon}
              resizeMode="contain"
            />
            <Text style={styles.cardNumber}>•••• •••• •••• 2109</Text>
          </View>
        ))}
      </View>

      <Button
        text="Continue"
        onPress={handlePayment}
        buttonStyle={styles.continueButton}
        textStyle={styles.continueButtonText}
      />

      <SuccessModal
        visible={isModalVisible}
        message="Payment done successfully."
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a52be',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  paymentIcon: {
    width: 40,
    height: 24,
    marginRight: 12,
  },
  cardNumber: {
    fontSize: 14,
    color: '#666',
  },

  continueButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
  },

  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ShippingScreen;
