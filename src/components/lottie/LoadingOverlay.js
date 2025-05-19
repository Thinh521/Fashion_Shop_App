import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window');

const LoadingOverlay = () => {
  return (
    <View style={styles.overlay}>
      <LottieView
        source={require('../../assets/animation/loading.json')}
        autoPlay
        loop
        style={styles.loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  loading: {
    width: 300,
    height: 300,
  },
});

export default LoadingOverlay;
