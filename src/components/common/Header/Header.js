import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './Header.styles';
import FastImage from 'react-native-fast-image';
import {MenuIcon} from '../../../assets/icons/Icons';
import Images from '../../../assets/images/Images';

const Header = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
        <MenuIcon width={24} height={24} />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <FastImage
          source={Images.common.logo}
          style={styles.logo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
        <FastImage
          source={Images.profile.avatar}
          style={styles.avatar}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
