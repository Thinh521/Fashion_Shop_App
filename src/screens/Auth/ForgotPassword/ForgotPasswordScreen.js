import React from 'react';
import {View, Text} from 'react-native';
import Input from '../../../components/ui/input';
import styles from './ForgotPassword.styles';
import {Button} from '../../../components/ui/button/Button';
import {MailIcon} from '../../../assets/icons/Icons';

const ForgotPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot password?</Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Username or Email"
          keyboardType="email-address"
          icon={MailIcon}
        />
      </View>
      <Text style={styles.forgotPasswordText}>
        * We will send you a message to set or reset your new password
      </Text>

      <Button
        text="Submit"
        buttonStyle={{
          backgroundColor: '#F83758',
          borderRadius: 4,
        }}
        height={55}
        textStyle={{fontSize: 20, fontWeight: 600}}
      />
    </View>
  );
};

export default ForgotPasswordScreen;
