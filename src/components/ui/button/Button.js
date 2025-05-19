import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './Button.styles';

export const Button = ({
  onPress,
  loading,
  disabled = false,
  activeOpacity = 0.7,
  text,
  textStyle = {},
  icon,
  leftIcon,
  rightIcon,
  iconOnly = false,
  iconStyle = {},
  iconPosition = 'left',
  width = 'auto',
  height = 50,
  buttonStyle = {},
  containerStyle = {},
  type = 'default',
}) => {
  const renderIcon = (icon, position = 'left') => {
    if (!icon) return null;

    const marginStyle =
      position === 'left'
        ? {marginRight: 6}
        : position === 'right'
        ? {marginLeft: 6}
        : {};

    const isComponent =
      typeof icon === 'function' || (typeof icon === 'object' && icon.$$typeof);

    return isComponent ? (
      <View style={[styles.icon, marginStyle, iconStyle]}>{icon}</View>
    ) : (
      <FastImage
        source={typeof icon === 'string' ? {uri: icon} : icon}
        style={[styles.icon, marginStyle, iconStyle]}
        resizeMode="contain"
      />
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={[styles.content, {justifyContent: 'center'}]}>
          <ActivityIndicator size="small" color="#fff" />
        </View>
      );
    }

    if (type === 'text') {
      return (
        <Text
          style={[
            styles.text,
            styles.textButton,
            textStyle,
            disabled && styles.disabledText,
          ]}>
          {text}
        </Text>
      );
    }

    if (type === 'icon') return renderIcon(icon);

    return (
      <View style={styles.content}>
        <View style={styles.iconWrapper}>
          {leftIcon && renderIcon(leftIcon, 'left')}
          {icon && iconPosition === 'left' && renderIcon(icon, 'left')}
        </View>

        {text && (
          <Text
            style={[styles.text, textStyle, disabled && styles.disabledText]}>
            {text}
          </Text>
        )}

        <View style={styles.iconWrapper}>
          {icon && iconPosition === 'right' && renderIcon(icon, 'right')}
          {rightIcon && renderIcon(rightIcon, 'right')}
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        type === 'text' && styles.textButtonContainer,
        type === 'icon' && styles.iconButton,
        {width, height},
        buttonStyle,
        (disabled || loading) && styles.disabledButton,
        containerStyle,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}>
      {renderContent()}
    </TouchableOpacity>
  );
};

export const TextButton = props => <Button type="text" {...props} />;
export const IconButton = props => <Button type="icon" {...props} />;
