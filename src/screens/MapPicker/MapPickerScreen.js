import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Linking,
  TouchableOpacity,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Colors, FontSizes, FontWeights, Shadows} from '../../theme/theme';
import {useTheme} from '../../contexts/ThemeContext';
import {scale} from '../../utils/scaling';

// Hằng số
const SHOP_LOCATION = {
  latitude: 10.806905,
  longitude: 106.626354,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const INITIAL_REGION = {
  ...SHOP_LOCATION,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const MapScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Yêu cầu quyền truy cập vị trí
  const requestLocationPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Quyền truy cập vị trí',
            message:
              'Ứng dụng cần quyền truy cập vị trí để hiển thị vị trí của bạn trên bản đồ.',
            buttonNeutral: 'Hỏi sau',
            buttonNegative: 'Hủy',
            buttonPositive: 'Đồng ý',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      console.warn('Lỗi yêu cầu quyền:', err);
      return false;
    }
  }, []);

  // Lấy vị trí người dùng
  const getUserLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setError('Quyền truy cập vị trí bị từ chối');
        return;
      }

      Geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          setIsLoading(false);
        },
        error => {
          setError('Không thể lấy vị trí: ' + error.message);
          setIsLoading(false);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (err) {
      setError('Lỗi khi lấy vị trí: ' + err.message);
      setIsLoading(false);
    }
  }, [requestLocationPermission]);

  // Mở Google Maps để chỉ đường
  const openGoogleMapsDirection = useCallback(() => {
    if (!userLocation) {
      setError('Vui lòng chờ xác định vị trí của bạn');
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${SHOP_LOCATION.latitude},${SHOP_LOCATION.longitude}&travelmode=driving`;

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          setError('Không thể mở Google Maps');
        }
      })
      .catch(err => {
        setError('Lỗi khi mở Google Maps: ' + err.message);
      });
  }, [userLocation]);

  useEffect(() => {
    getUserLocation();

    // Dọn dẹp khi component unmount
    return () => {
      Geolocation.stopObserving();
    };
  }, [getUserLocation]);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        region={userLocation || INITIAL_REGION}
        showsUserLocation={!!userLocation}
        showsMyLocationButton={true}
        loadingEnabled={true}>
        <Marker
          coordinate={SHOP_LOCATION}
          title="Cửa hàng"
          description="Vị trí cửa hàng"
          image={require('../../assets/images/common/shopping-bag-fill.png')}
        />
      </MapView>

      <TouchableOpacity
        style={styles.directionButton}
        onPress={openGoogleMapsDirection}
        disabled={isLoading || !userLocation}>
        <Text style={styles.buttonText}>Chỉ đường</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    map: {
      flex: 1,
    },
    directionButton: {
      position: 'absolute',
      bottom: scale(30),
      left: scale(20),
      right: scale(20),
      backgroundColor: Colors.primary,
      paddingVertical: scale(14),
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      ...Shadows.medium,
      opacity: theme.disabledOpacity,
    },
    buttonText: {
      color: Colors.white,
      fontSize: FontSizes.regular,
      fontWeight: FontWeights.semiBold,
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.white + '80',
    },
    errorContainer: {
      position: 'absolute',
      top: scale(20),
      left: scale(20),
      right: scale(20),
      backgroundColor: Colors.error,
      padding: scale(10),
      borderRadius: 5,
      ...Shadows.small,
    },
    errorText: {
      color: Colors.white,
      fontSize: FontSizes.small,
      textAlign: 'center',
    },
  });

export default MapScreen;
