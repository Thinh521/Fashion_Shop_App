import React, {useEffect, useRef} from 'react';
import {Text, View, Animated, StyleSheet, SafeAreaView} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {Button} from '../../components/ui/button/Button';
import {Colors, FontSizes, FontWeights, Shadows} from '../../theme/theme';
import {useNavigation} from '@react-navigation/core';
import {scale} from '../../utils/scaling';
import {SuccessIcon} from '../../assets/icons/Icons';

const OrderSuccessScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleGoHome = () => {
    navigation.navigate('MainTabNavigator', {
      screen: 'Home',
    });
  };

  const handleViewOrder = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Order',
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
        <View style={styles.successContainer}>
          <SuccessIcon />
        </View>
        <Text style={[styles.title, {color: theme.text}]}>
          Đặt hàng thành công!
        </Text>
        <Text style={[styles.message, {color: theme.textSecondary}]}>
          Cảm ơn bạn đã mua sắm! Đơn hàng của bạn đã được xác nhận và sẽ sớm
          được xử lý.
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            text="Trang chủ"
            onPress={handleGoHome}
            buttonStyle={[styles.button, styles.homeButton]}
            textStyle={styles.buttonText}
          />
          <Button
            text="Xem đơn hàng"
            onPress={handleViewOrder}
            buttonStyle={styles.button}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: scale(30),
    width: '100%',
  },
  successContainer: {
    marginBottom: scale(20),
  },
  title: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.bold,
    marginBottom: scale(10),
    textAlign: 'center',
  },
  message: {
    fontSize: FontSizes.regular,
    textAlign: 'center',
    marginBottom: scale(20),
    lineHeight: scale(22),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: scale(10),
  },
  button: {
    flex: 1,
    borderRadius: 10,
    ...Shadows.small,
  },
  homeButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  viewOrderButton: {
    backgroundColor: Colors.primary,
  },
  buttonText: {
    color: Colors.primary,
    textAlign: 'center',
  },
});

export default OrderSuccessScreen;
