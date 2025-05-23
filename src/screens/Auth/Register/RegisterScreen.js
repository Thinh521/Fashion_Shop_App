import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {showMessage} from 'react-native-flash-message';
import styles from './RegisterStyles';
import commonStyles from '../../../styles/commonStyles';
import Images from '../../../assets/images/Images';
import Input from '../../../components/ui/input';
import {
  Button,
  IconButton,
  TextButton,
} from '../../../components/ui/button/Button';
import {LockIcon, MailIcon} from '../../../assets/icons/Icons';
import {
  addUser,
  getAllUsers,
  saveCurrentUser,
} from '../../../utils/storage';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Xử lí phần thông báo lỗi
  const validateInputs = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Hàm tạo tên ngẫu nhiên
  const generateRandomName = () => {
    const firstNames = ['John', 'Jane', 'Alex', 'Sam', 'Charlie'];
    const lastNames = ['Smith', 'Doe', 'Brown', 'Williams', 'Johnson'];

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${firstName} ${lastName}`;
  };

  // Logic đăng ký
  const handleRegister = () => {
    if (!validateInputs()) return;

    setIsLoading(true);

    setTimeout(() => {
      const allUsers = getAllUsers();

      // Kiểm tra user đã tồn tại hay chưa
      const existingUser = allUsers.find(user => user.email === email);
      if (existingUser) {
        setIsLoading(false);
        showMessage({
          message: 'Đăng ký thất bại',
          description: 'Email đã tồn tại',
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      // Tạo đối tượng user mới
      const newUser = {
        id: Date.now(),
        name: generateRandomName(),
        email,
        password,
        phone: '',
        role: 'user',
        avatar: Images.profile.avatar,
        state: '',
        address: {
          pincode: '',
          address: '',
          city: '',
          country: '',
        },
        bank: {
          accountNumber: '',
          accountHolder: '',
          ifscCode: '',
        },
        wishlist: [],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Thêm user mới và lưu là currentUser
      addUser(newUser);
      saveCurrentUser(newUser);

      console.log('User vừa đăng ký', newUser);

      showMessage({
        message: 'Đăng ký thành công',
        description: 'Bạn có thể đăng nhập ngay bây giờ',
        type: 'success',
        duration: 3000,
        icon: 'success',
        style: {alignItems: 'center', paddingVertical: 20},
      });

      setIsLoading(false);
      navigation.navigate('Login');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          leftIcon={MailIcon}
          value={email}
          inputStyle={{marginInlineStart: 6}}
          containerStyle={[
            styles.containerStyle,
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
        {!!errors.email && (
          <Text style={{color: 'red', marginTop: 4}}>{errors.email}</Text>
        )}
      </View>

      {/* Password */}
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
        {!!errors.password && (
          <Text style={{color: 'red', marginTop: 4}}>{errors.password}</Text>
        )}
      </View>

      {/* Confirm Password */}
      <View style={styles.inputContainer}>
        <Input
          placeholder="Confirm Password"
          leftIcon={LockIcon}
          isPassword
          value={confirmPassword}
          containerStyle={[
            styles.containerStyle,
            errors.confirmPassword && {borderColor: 'red', borderWidth: 1},
          ]}
          onBlur={() => {
            if (!confirmPassword) {
              setErrors(prev => ({
                ...prev,
                confirmPassword: 'Confirm password is required',
              }));
            }
          }}
          onChangeText={text => {
            setConfirmPassword(text);
            if (errors.confirmPassword)
              setErrors(prev => ({...prev, confirmPassword: ''}));
          }}
        />
        {!!errors.confirmPassword && (
          <Text style={{color: 'red', marginTop: 4}}>
            {errors.confirmPassword}
          </Text>
        )}
      </View>

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>
          By clicking the <Text style={{color: '#FF4B26'}}>Register</Text>{' '}
          button, you agree to the public offer
        </Text>
      </TouchableOpacity>

      <Button
        text="Create Account"
        onPress={handleRegister}
        buttonStyle={{
          backgroundColor: '#F83758',
          borderRadius: 4,
          width: '100%',
        }}
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
          <Text style={styles.signUpText}>I Already Have an Account </Text>
          <TextButton
            text="Login"
            onPress={() => navigation.navigate('Login')}
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
    </View>
  );
};

export default RegisterScreen;
