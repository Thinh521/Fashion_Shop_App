import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {LeftIcon} from '../../assets/icons/Icons';
import styles from './PageHeader.styles';

const PageHeader = ({
  title,
  showBackButton = true,
  onBackPress,
  rightContent,
  containerStyle,
  titleStyle,
}) => {
  // Xác định xem có nội dung bên phải không
  const hasRightContent = !!rightContent;
  // Xác định xem có title không
  const hasTitle = !!title;

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Phần bên trái - Nút back */}
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}>
            <LeftIcon />
          </TouchableOpacity>
        )}
      </View>

      {/* Phần giữa - Title */}
      <View style={styles.centerSection}>
        {hasTitle && (
          <Text
            style={[styles.title, titleStyle]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {title}
          </Text>
        )}
      </View>

      {/* Phần bên phải */}
      <View style={styles.rightSection}>
        {hasRightContent && (
          <View style={styles.rightContent}>{rightContent}</View>
        )}
      </View>
    </View>
  );
};

export default PageHeader;
