import React from 'react';
import styles from './Splash.styles';
import FastImage from 'react-native-fast-image';
import {View} from 'react-native';
import Images from '../../assets/images/Images';

const splashScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <FastImage
          source={Images.common.splashScreen}
          style={styles.imageLogo}
          resizeMode="contain"
        />
      </View>
    </>
  );
};

export default splashScreen;
