import React, {useEffect, useState} from 'react';
import {
  View,
  Linking,
  TouchableOpacity,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
// import Geolocation from '@react-native-geolocation-service';
import {Colors, FontSizes, FontWeights, Shadows} from '../../theme/theme';
import {useTheme} from '../../contexts/ThemeContext';
import {scale} from '../../utils/scaling';

const MapScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const [userLocation, setUserLocation] = useState(null);

  // Vị trí shop cố định
  
  const shopLocation = {
    latitude: 10.806905,
    longitude: 106.626354,
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // const getUserLocation = async () => {
  //   const hasPermission = await requestLocationPermission();
  //   if (!hasPermission) return;

  //   Geolocation.getCurrentPosition(
  //     position => {
  //       setUserLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         latitudeDelta: 0.01,
  //         longitudeDelta: 0.01,
  //       });
  //     },
  //     error => {
  //       console.log('Lỗi khi lấy vị trí:', error);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // };

  // useEffect(() => {
  //   getUserLocation();
  // }, []);

  const openGoogleMapsDirection = () => {
    if (!userLocation) return;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${shopLocation.latitude},${shopLocation.longitude}&travelmode=driving`;
    Linking.openURL(url).catch(err =>
      console.error('Lỗi khi mở Google Maps:', err),
    );
  };

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        region={
          userLocation || {
            ...shopLocation,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }
        }
        showsUserLocation={true}
        showsMyLocationButton={true}>
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Vị trí của bạn"
            description="Đây là vị trí hiện tại"
          />
        )}

        <Marker
          coordinate={shopLocation}
          title="Cửa hàng"
          description="Vị trí cửa hàng cố định"
        />
      </MapView>

      <TouchableOpacity
        style={styles.directionButton}
        onPress={openGoogleMapsDirection}>
        <Text style={styles.buttonText}>Đường đi</Text>
      </TouchableOpacity>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
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
    },
    buttonText: {
      color: Colors.white,
      fontSize: FontSizes.regular,
      fontWeight: FontWeights.semiBold,
    },
  });

export default MapScreen;
