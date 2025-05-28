import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet, Alert, ScrollView, Modal} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from '../../components/ui/button/Button';
import Images from '../../assets/images/Images';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useTheme} from '../../contexts/ThemeContext';
import {getOrder, saveOrder} from '../../utils/storage';
import {Colors} from '../../theme/theme';
import {Successs} from '../../assets/icons/Icons';

const ShippingScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const {order} = useRoute().params || {};
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleConfirmOrder = useCallback(() => {
    if (!order?.product || !order?.address || !order?.user) {
      Alert.alert('Lỗi', 'Thông tin đơn hàng không đầy đủ.');
      return;
    }

    // Lưu đơn hàng vào MMKV
    const orderId = `order_${Date.now()}`;
    const orderData = {
      id: orderId,
      user: order.user,
      product: order.product,
      address: order.address,
      createdAt: order.createdAt,
      status: 'pending',
    };

    try {
      const existingOrders = getOrder(order.user.id);
      const updatedOrders = [orderData, ...existingOrders];
      saveOrder(order.user.id, updatedOrders);

      setIsModalVisible(true);
      setTimeout(() => {
        setIsModalVisible(false);
        navigation.navigate('MainTabNavigator', {
          screen: 'Home',
        });
      }, 3000);
    } catch (error) {
      console.error('Lỗi lưu đơn hàng:', error);
      Alert.alert('Lỗi', 'Không thể lưu đơn hàng. Vui lòng thử lại.');
    }
  }, [navigation, order]);

  // Tính giá động
  const orderPrice = order?.product
    ? parseFloat(order.product.price ?? '0')
        .toString()
        .replace('₹', '') * (order.product.quantity || 1)
    : 0;
  const shippingFee = 30;
  const totalPrice = orderPrice + shippingFee;

  return (
    <View style={{backgroundColor: theme.background}}>
      {/* Order Summary Section */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{padding: 16}}>
          <View
            style={[styles.sectionContainer, {backgroundColor: theme.card}]}>
            <Text style={[styles.sectionTitle, {color: theme.text}]}>
              Order Summary
            </Text>
            <View style={styles.row}>
              <Text style={[styles.label, {color: theme.text}]}>Order</Text>
              <Text style={[styles.value, {color: theme.text}]}>
                ₹{orderPrice.toFixed(0)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.label, {color: theme.text}]}>Shipping</Text>
              <Text style={[styles.value, {color: theme.text}]}>
                ₹{shippingFee}
              </Text>
            </View>
            <View style={[styles.row, styles.totalRow]}>
              <Text style={[styles.totalLabel, {color: theme.text}]}>
                Total
              </Text>
              <Text style={[styles.totalValue, {color: theme.text}]}>
                ₹{totalPrice.toFixed(0)}
              </Text>
            </View>

            <Text
              style={[styles.sectionTitle, {color: theme.text, marginTop: 20}]}>
              Order Details
            </Text>

            <View style={{marginBottom: 20}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.infoText, {color: theme.text}]}>
                Product: {order?.product?.title || 'N/A'}
              </Text>
              {order?.product?.colorName && (
                <Text style={[styles.infoText, {color: theme.text}]}>
                  Color: {order?.product?.colorName || 'N/A'}
                </Text>
              )}
              {order?.product?.sizeName && (
                <Text style={[styles.infoText, {color: theme.text}]}>
                  Size: {order?.product?.sizeName || 'N/A'}
                </Text>
              )}
              <Text style={[styles.infoText, {color: theme.text}]}>
                Quantity: {order?.product?.quantity || 'N/A'}
              </Text>
              <Text style={[styles.infoText, {color: theme.text}]}>
                Price: {order?.product?.price || 'N/A'}
              </Text>
              <Text style={[styles.infoText, {color: theme.text}]}>
                Address: {order?.address || 'N/A'}
              </Text>
              <Text style={[styles.infoText, {color: theme.text}]}>
                Name: {order?.user?.username || 'N/A'}
              </Text>
              <Text style={[styles.infoText, {color: theme.text}]}>
                Phone: {order?.user?.phone || 'N/A'}
              </Text>
              {order?.user?.email && (
                <Text style={[styles.infoText, {color: theme.text}]}>
                  Email: {order?.user?.email}
                </Text>
              )}
            </View>
          </View>

          <View style={[styles.divider, {backgroundColor: theme.border}]} />

          {/* Payment Methods Section */}
          <View
            style={[styles.sectionContainer, {backgroundColor: theme.card}]}>
            <Text style={[styles.sectionTitle, {color: theme.text}]}>
              Payment Methods
            </Text>
            {['visa', 'paypal', 'master', 'applepay'].map(method => (
              <View
                key={method}
                style={[
                  styles.paymentMethod,
                  {borderBottomColor: theme.border},
                ]}>
                <FastImage
                  source={Images.common[method]}
                  style={styles.paymentIcon}
                  resizeMode="contain"
                />
                <Text style={[styles.cardNumber, {color: theme.text}]}>
                  •••• •••• •••• 2109
                </Text>
              </View>
            ))}
          </View>

          <Button
            text="Confirm Order"
            onPress={handleConfirmOrder}
            buttonStyle={[styles.continueButton]}
            textStyle={styles.continueButtonText}
          />

          <Modal
            visible={isModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setIsModalVisible(false)}>
            <View style={styles.overlay}>
              <View style={styles.modalContent}>
                <Successs />
                <Text style={styles.modalText}>Payment done successfully.</Text>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '82%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalText: {
    color: Colors.black,
  },
  sectionContainer: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
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
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  paymentIcon: {
    width: 40,
    height: 24,
    marginRight: 12,
  },
  cardNumber: {
    fontSize: 14,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
  },
  continueButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  continueButtonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default ShippingScreen;
