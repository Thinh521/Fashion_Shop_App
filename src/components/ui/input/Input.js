import React, {useState} from 'react';
import {TextInput, TouchableOpacity, View, Text} from 'react-native';
import {EyeIcon, EyeOffIcon} from '../../../assets/icons/Icons';
import styles from './Input.styles';

const Input = ({
  placeholder,
  keyboardType = 'default',
  width = '100%',
  height = 55,
  placeholderTextColor = '#A8A8A9',
  containerStyle = {},
  inputStyle = {},
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  disabled = false,
  readonly = false,
  value,
  onChangeText,
  isPassword = false,
  label,
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  if (readonly) {
    return (
      <View>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={[styles.readonlyField, {height}, containerStyle]}>
          <Text style={[styles.readonlyText, inputStyle]}>
            {value || 'N/A'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.inputGroup}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          {width, height},
          containerStyle,
          (disabled || readonly) && styles.disabledContainer,
        ]}>
        {LeftIcon && <LeftIcon style={styles.leftIcon} />}

        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          autoCapitalize="none"
          keyboardType={keyboardType}
          editable={!disabled && !readonly}
          secureTextEntry={isPassword && !isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
          {...rest}
        />

        <View style={styles.rightContent}>
          {isPassword ? (
            <TouchableOpacity onPress={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <EyeIcon style={styles.eyeIcon} />
              ) : (
                <EyeOffIcon style={styles.eyeIcon} />
              )}
            </TouchableOpacity>
          ) : null}

          {!isPassword && RightIcon && <RightIcon style={styles.rightIcon} />}
        </View>
      </View>
    </View>
  );
};

export default Input;
