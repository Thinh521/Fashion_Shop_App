import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {
  Button,
  IconButton,
  TextButton,
} from '../../../components/ui/button/Button';
import Input from '../../../components/ui/input';
import {useForm, Controller} from 'react-hook-form';
import {LockIcon, MailIcon} from '../../../assets/icons/Icons';
import Images from '../../../assets/images/Images';
import styles from './LoginStyles';
import commonStyles from '../../../styles/commonStyles';
import {showMessage} from 'react-native-flash-message';
import {saveCurrentUser} from '../../../utils/storage';
import LoadingOverlay from '../../../components/lottie/LoadingOverlay';
import {useUsers} from '../../../hooks/useUsers';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {data: users = [], isLoading: isFetchingUsers, error} = useUsers();

  // Xử lý đăng nhập
  const onSubmit = async ({email, password}) => {
    setIsLoggingIn(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const matchedUser = users.find(
        user => user.email === email && user.password === password,
      );

      if (!matchedUser) {
        showMessage({
          message: 'Lỗi đăng nhập',
          description: 'Sai tài khoản hoặc mật khẩu',
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      await saveCurrentUser(matchedUser);

      showMessage({
        message: 'Đăng nhập thành công',
        description: `Chào mừng ${
          matchedUser.name || matchedUser.firstName || ''
        } đến với Stylish`,
        type: 'success',
        duration: 2000,
        icon: 'success',
        style: {
          alignItems: 'center',
          paddingVertical: 20,
        },
      });

      navigation.navigate('MainTabNavigator', {screen: 'Home'});
    } catch (err) {
      showMessage({
        message: 'Lỗi',
        description: err.message || 'Đã xảy ra lỗi',
        type: 'danger',
        duration: 3000,
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (isFetchingUsers) return <LoadingOverlay />;

  if (error) {
    return (
      <View style={styles.loginContainer}>
        <Text style={{color: 'red', textAlign: 'center'}}>
          Lỗi tải dữ liệu người dùng. Vui lòng thử lại.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Welcome Back!</Text>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Email không hợp lệ',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Email"
              keyboardType="email-address"
              leftIcon={MailIcon}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              inputStyle={{marginInlineStart: 6}}
              containerStyle={[
                errors.email && {borderColor: 'red', borderWidth: 1},
              ]}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password phải ít nhất 6 ký tự',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Password"
              leftIcon={LockIcon}
              isPassword
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
              containerStyle={[
                styles.containerStyle,
                errors.password && {borderColor: 'red', borderWidth: 1},
              ]}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => navigation.navigate('Forgotpassword')}>
        <Text style={styles.forgotPasswordText}>Forget Password?</Text>
      </TouchableOpacity>

      <Button
        text="Login"
        onPress={handleSubmit(onSubmit)}
        disabled={isLoggingIn} // Disable nút khi đang đăng nhập
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

      {isLoggingIn && <LoadingOverlay />}
    </View>
  );
};

export default LoginScreen;
