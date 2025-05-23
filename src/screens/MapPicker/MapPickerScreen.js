import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MapPickerScreen = ({navigation}) => {
  const fixedRegion = {
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const fixedAddress = '11 Nguyễn Văn Khối, Phường 11, Gò Vấp, TP.HCM';

  const confirmLocation = () => {
    navigation.navigate('Checkout', {
      address: fixedAddress,
      coordinates: {
        latitude: fixedRegion.latitude,
        longitude: fixedRegion.longitude,
      },
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={fixedRegion}
        scrollEnabled={false}
        zoomEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        showsUserLocation={false}>
        <Marker
          coordinate={fixedRegion}
          title="Vị trí giao hàng"
          description={fixedAddress}
          pinColor="#FF6347"
        />
      </MapView>
      <View style={styles.addressContainer}>
        <Text style={styles.addressText}>Địa chỉ: {fixedAddress}</Text>
        <Text style={styles.addressText}>
          Tọa độ: {fixedRegion.latitude.toFixed(6)},{' '}
          {fixedRegion.longitude.toFixed(6)}
        </Text>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={confirmLocation}>
          <Text style={styles.confirmButtonText}>Xác nhận vị trí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  addressContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#FF6347',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default React.memo(MapPickerScreen);
