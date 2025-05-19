import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
  Button,
  IconButton,
  TextButton,
} from '../../../components/ui/button/Button';
import Input from '../../../components/ui/input';
import {LockIcon, MailIcon} from '../../../assets/icons/Icons';
import Images from '../../../assets/images/Images';
import styles from './LoginStyles';
import commonStyles from '../../../styles/commonStyles';
import {showMessage} from 'react-native-flash-message';
import {getAllUsers, saveCurrentUser} from '../../../utils/storage';
import LoadingOverlay from '../../../components/lottie/LoadingOverlay';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  // Xử lí thông báo lỗi
  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is not valid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lí logic đăng nhập
  const handleLogin = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const users = getAllUsers();
      const matchedUser = users.find(
        user => user.email === email && user.password === password,
      );

      if (!matchedUser) {
        setIsLoading(false);
        showMessage({
          message: 'Lỗi đăng nhập',
          description: 'Sai tài khoản hoặc mật khẩu',
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      saveCurrentUser(matchedUser);

      setIsLoading(false);
      navigation.navigate('MainTabNavigator', {screen: 'Home'});

      showMessage({
        message: 'Đăng nhập thành công',
        description: `Chào mừng ${matchedUser.name || ''} đến với Stylish`,
        type: 'success',
        duration: 2000,
        icon: 'success',
        style: {
          alignItems: 'center',
          paddingVertical: 20,
        },
      });
    }, 1000);
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          leftIcon={MailIcon}
          value={email}
          inputStyle={{marginInlineStart: 6}}
          containerStyle={[
            errors.email && {borderColor: 'red', borderWidth: 1},
          ]}
          onBlur={() => {
            if (!email) {
              setErrors(prev => ({...prev, email: 'Email is required'}));
            }
          }}
          onChangeText={text => {
            setEmail(text);
            if (errors.email) setErrors(prev => ({...prev, email: ''}));
          }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Input
          placeholder="Password"
          leftIcon={LockIcon}
          isPassword
          value={password}
          containerStyle={[
            styles.containerStyle,
            errors.password && {borderColor: 'red', borderWidth: 1},
          ]}
          onBlur={() => {
            if (!password) {
              setErrors(prev => ({...prev, password: 'Password is required'}));
            }
          }}
          onChangeText={text => {
            setPassword(text);
            if (errors.password) setErrors(prev => ({...prev, password: ''}));
          }}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text
          onPress={() => navigation.navigate('Forgotpassword')}
          style={styles.forgotPasswordText}>
          Forget Password?
        </Text>
      </TouchableOpacity>

      <Button
        text="Login"
        onPress={handleLogin}
        disabled={isLoading}
        buttonStyle={{backgroundColor: '#F83758', borderRadius: 4}}
        width="100%"
        height={55}
        textStyle={{fontSize: 20, fontWeight: '600'}}
      />

      <View style={styles.box}>
        <Text style={styles.dividerText}>- OR Continue with -</Text>

        <View style={styles.socialIconsContainer}>
          <IconButton
            icon={Images.auth.google}
            onPress={() => {}}
            iconStyle={styles.socialIconImage}
            containerStyle={styles.socialIcon}
          />
          <IconButton
            icon={Images.auth.apple}
            onPress={() => {}}
            iconStyle={styles.socialIconImage}
            containerStyle={styles.socialIcon}
          />
          <IconButton
            icon={Images.auth.facebook}
            onPress={() => {}}
            iconStyle={styles.socialIconImage}
            containerStyle={styles.socialIcon}
          />
        </View>

        <View style={commonStyles.rowCenter}>
          <Text style={styles.signUpText}>Create An Account </Text>
          <TextButton
            text="Sign Up"
            onPress={() => navigation.navigate('Register')}
            textStyle={styles.signUpTextLink}
            containerStyle={{
              height: 'auto',
              width: 'auto',
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          />
        </View>
      </View>

      {isLoading && <LoadingOverlay />}
    </View>
  );
};

export default LoginScreen;
