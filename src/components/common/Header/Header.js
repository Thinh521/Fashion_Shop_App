import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {MenuIcon} from '../../../assets/icons/Icons';
import Images from '../../../assets/images/Images';
import {useTheme} from '../../../contexts/ThemeContext';
import createStyles from './Header.styles';

const Header = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton} activeOpacity={0.7}>
        <MenuIcon width={24} height={24} style={{color: theme.icon}} />
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
