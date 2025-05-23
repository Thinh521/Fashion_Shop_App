import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';
import {useTheme} from '../../contexts/ThemeContext';

const {width, height} = Dimensions.get('window');

const LoadingOverlay = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

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

const createStyles = theme =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      backgroundColor: theme.loadingBackground,
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
