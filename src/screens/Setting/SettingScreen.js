import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {Button, TextButton} from '../../components/ui/button/Button';
import {CommonActions, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import styles from './Setting.styles';
import commonStyles from '../../styles/commonStyles';
import {EditIcon} from '../../assets/icons/Icons';
import Input from '../../components/ui/input';
import {
  clearCurrentUser,
  getAllUsers,
  getCurrentUser,
  saveAllUsers,
  saveCurrentUser,
} from '../../utils/storage';
import Images from '../../assets/images/Images';

const SettingScreen = () => {
  const navigation = useNavigation();
  const [userLocal, setUserLocal] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserLocal(user);
        setFormData(user);
      }
    };

    loadUserFromStorage();
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  const handleBankChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      bank: {
        ...prev.bank,
        [field]: value,
      },
    }));
  };

  const handleLogout = async () => {
    await clearCurrentUser();
    setUserLocal(null);
    setFormData(null);

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  const handleSave = async () => {
    setUserLocal(formData);
    await saveCurrentUser(formData);

    const allUsers = await getAllUsers();
    const updatedUsers = allUsers.map(u =>
      u.id === formData.id ? formData : u,
    );
    await saveAllUsers(updatedUsers);

    setEditing(false);
  };

  if (!userLocal) {
    return;
  }

  return (
    <View style={commonStyles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileContainer}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                <FastImage
                  style={styles.avatar}
                  source={Images.profile.avatar}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <TouchableOpacity
                onPress={() => setEditing(prev => !prev)}
                style={[commonStyles.rowCenter, styles.editIconWrapper]}>
                <EditIcon />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>
              {formData?.name || 'No Name'}
            </Text>
          </View>

          {/* Personal Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>

            <Input
              label="Name"
              value={formData.name}
              readonly={!isEditing}
              onChangeText={text => handleChange('name', text)}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Phone"
              value={formData.phone}
              readonly={!isEditing}
              onChangeText={text => handleChange('phone', text)}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Email Address"
              value={formData.email}
              readonly
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Password"
              value={formData.password}
              readonly
              isPassword
              containerStyle={styles.inputContainer}
            />

            <TextButton
              text="Change Password"
              containerStyle={styles.changePassword}
              textStyle={styles.changePasswordText}
            />
          </View>

          {/* Address */}
          <View style={styles.section}>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Business Address Details</Text>

            <Input
              label="State"
              value={formData.address?.state || ''}
              readonly={!isEditing}
              onChangeText={text => handleAddressChange('state', text)}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Pincode"
              value={formData.address?.pincode || ''}
              readonly={!isEditing}
              onChangeText={text => handleAddressChange('pincode', text)}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Address"
              value={formData.address?.address || ''}
              readonly={!isEditing}
              onChangeText={text => handleAddressChange('address', text)}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="City"
              value={formData.address?.city || ''}
              readonly={!isEditing}
              onChangeText={text => handleAddressChange('city', text)}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Country"
              value={formData.address?.country || ''}
              readonly={!isEditing}
              onChangeText={text => handleAddressChange('country', text)}
              containerStyle={styles.inputContainer}
            />
          </View>

          {/* Bank Info */}
          <View style={styles.section}>
            <View style={styles.divider} />
            <Text style={styles.sectionTitle}>Bank Account Details</Text>

            <Input
              label="Bank Account Number"
              value={formData.bank?.accountNumber || ''}
              readonly={!isEditing}
              onChangeText={text => handleBankChange('accountNumber', text)}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Account Holder's Name"
              value={formData.bank?.accountHolder || ''}
              readonly={!isEditing}
              onChangeText={text => handleBankChange('accountHolder', text)}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="IFSC Code"
              value={formData.bank?.ifscCode || ''}
              readonly={!isEditing}
              onChangeText={text => handleBankChange('ifscCode', text)}
              containerStyle={styles.inputContainer}
            />
          </View>

          {isEditing && (
            <Button
              text="Save"
              onPress={handleSave}
              buttonStyle={styles.primaryButton}
            />
          )}

          <Button
            text="Logout"
            onPress={handleLogout}
            buttonStyle={styles.primaryButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
