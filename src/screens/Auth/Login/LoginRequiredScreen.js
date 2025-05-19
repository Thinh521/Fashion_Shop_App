import React, {useCallback, useRef, useEffect} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {Button, IconButton} from '../../../components/ui/button/Button';
import FastImage from 'react-native-fast-image';
import Images from '../../../assets/images/Images';
import {Colors, FontSizes, FontWeights} from '../../../theme/theme';
import {LeftIcon} from '../../../assets/icons/Icons';

const LoginRequiredScreen = () => {
  const navigation = useNavigation();
  const isMounted = useRef(false);
  const {width, height} = useWindowDimensions();

  const BUTTON_WIDTH = Math.min(width * 0.6, 400);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Xử lý nút back vật lý
  useFocusEffect(
    useCallback(() => {
      let backHandler = null;
      if (Platform.OS === 'android') {
        backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          if (isMounted.current) {
            navigation.goBack();
            return true; // Ngăn hành vi mặc định
          }
          return false;
        });
      }
      return () => {
        if (backHandler) backHandler.remove();
      };
    }, [navigation, isMounted]),
  );

  // Hàm điều hướng đã memoized
  const navigateToLogin = useCallback(() => {
    navigation.navigate('NoBottomTab', {screen: 'Login'});
  }, [navigation]);

  const navigateToRegister = useCallback(() => {
    navigation.navigate('NoBottomTab', {screen: 'Register'});
  }, [navigation]);

  const navigationToHome = useCallback(() => {
    navigation.navigate('MainTabNavigator', {screen: 'Home'});
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} pointerEvents="box-none">
        <FastImage
          source={Images.common.loginRequired}
          style={[styles.backgroundImage, {width, height}]}
          resizeMode={FastImage.resizeMode.cover}
          priority={FastImage.priority.high}
          cache={FastImage.cacheControl.immutable}
          defaultSource={Images.common.fallback}
          onError={error => console.log('FastImage error:', error)}
        />

        <View style={styles.overlay} pointerEvents="auto">
          <View style={styles.topLeftContainer}>
            <IconButton
              iconStyle={styles.backButton}
              icon={<LeftIcon color="white" />}
              onPress={navigationToHome}
            />
          </View>

          <View style={styles.centerContent}>
            <Text
              style={[
                styles.text,
                {fontSize: Math.min(width * 0.05, FontSizes.large)},
              ]}>
              Bạn cần đăng nhập để truy cập trang này.
            </Text>
            <Button
              text="Đăng nhập ngay"
              buttonStyle={[styles.button, {width: BUTTON_WIDTH}]}
              onPress={navigateToLogin}
            />
            <Button
              text="Đăng ký ngay"
              buttonStyle={[
                styles.button,
                styles.secondaryButton,
                {width: BUTTON_WIDTH},
              ]}
              textStyle={styles.secondaryButtonText}
              onPress={navigateToRegister}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(LoginRequiredScreen);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },

  topLeftContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 16 : 12,
    left: 16,
    zIndex: 10,
  },

  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 16 : 12,
    left: 10,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 24,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: FontWeights.semiBold,
    lineHeight: 24,
  },
  button: {
    alignSelf: 'center',
    marginVertical: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontWeight: FontWeights.medium,
  },
});
