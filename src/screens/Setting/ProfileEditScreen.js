import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Input from '../../components/ui/input/Input';
import {Button, TextButton} from '../../components/ui/button/Button';
import {useNavigation, useRoute} from '@react-navigation/core';
import {getAllUsers, saveAllUsers, saveCurrentUser} from '../../utils/storage';
import commonStyles from '../../styles/commonStyles';
import {EditIcon} from '../../assets/icons/Icons';
import {scale} from '../../utils/scaling';
import {Colors, FontSizes, FontWeights, Shadows} from '../../theme/theme';
import {useTheme} from '../../contexts/ThemeContext';

const ProfileEditScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const navigation = useNavigation();
  const {user} = useRoute().params || {};
  const [editedData, setEditedData] = useState(user);
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field, value) => {
    setEditedData(prev => ({...prev, [field]: value}));
  };

  const handleAddressChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      address: {...prev.address, [field]: value},
    }));
  };

  const handleBankChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      bank: {...prev.bank, [field]: value},
    }));
  };

  const handleSave = async () => {
    await saveCurrentUser(editedData);

    const allUsers = await getAllUsers();
    const updatedUsers = allUsers.map(user =>
      user.id === editedData.id ? editedData : user,
    );
    await saveAllUsers(updatedUsers);

    setIsEditing(false);

    navigation.navigate('NoBottomTab', {
      screen: 'Settings',
      params: {updatedData: editedData},
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(user);
    navigation.navigate('NoBottomTab', {screen: 'Settings'});
  };

  return (
    <View style={{backgroundColor: theme.background, flex: 1}}>
      <ScrollView
        style={{padding: scale(16)}}
        showsVerticalScrollIndicator={false}>
        <View>
          <TouchableOpacity
            style={[commonStyles.rowCenter, styles.editIconWrapper]}
            onPress={() => setIsEditing(true)}>
            <EditIcon />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.profileInfo}>
          {['personal', 'address', 'bank'].map(section => (
            <TouchableOpacity
              key={section}
              style={[
                styles.infoTab,
                activeSection === section && styles.activeTab,
              ]}
              onPress={() => setActiveSection(section)}>
              <Text
                style={
                  activeSection === section
                    ? styles.activeTabText
                    : styles.tabText
                }>
                {section === 'personal'
                  ? 'Personal'
                  : section === 'address'
                  ? 'Address'
                  : 'Bank Info'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Personal */}
        {activeSection === 'personal' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <Input
              label="Name"
              value={editedData.username}
              onChangeText={text => handleChange('name', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
            <Input
              label="Phone"
              value={editedData.phone}
              onChangeText={text => handleChange('phone', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
            <Input
              label="Email Address"
              value={editedData.email}
              onChangeText={text => handleChange('email', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
            <Input
              label="Password"
              value={editedData.password}
              onChangeText={text => handleChange('password', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
              isPassword
            />
            {isEditing && <TextButton text="Change Password" />}
          </View>
        )}

        {/* Address */}
        {activeSection === 'address' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Address Details</Text>
            <Input
              label="State"
              value={editedData.address.state}
              onChangeText={text => handleAddressChange('state', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
            <Input
              label="Pincode"
              value={editedData.ip}
              onChangeText={text => handleAddressChange('pincode', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
            <Input
              label="Address"
              value={editedData.address.address}
              onChangeText={text => handleAddressChange('address', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
            <Input
              label="City"
              value={editedData.address.city}
              onChangeText={text => handleAddressChange('city', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
            <Input
              label="Country"
              value={editedData.address.country}
              onChangeText={text => handleAddressChange('country', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
          </View>
        )}

        {/* Bank */}
        {activeSection === 'bank' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bank Account Details</Text>
            <Input
              label="Bank Account Number"
              value={editedData.bank.cardNumber}
              onChangeText={text => handleBankChange('accountNumber', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
            <Input
              label="Account Holder's Name"
              value={editedData.bank.cardType}
              onChangeText={text => handleBankChange('accountHolder', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
            <Input
              label="IFSC Code"
              value={editedData.bank.iban}
              onChangeText={text => handleBankChange('ifscCode', text)}
              containerStyle={styles.inputContainer}
              readonly={!isEditing}
            />
          </View>
        )}

        {/* Buttons */}
        {isEditing && (
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={[styles.button, styles.close]}
              text="Cancel"
              onPress={handleCancel}
            />
            <Button
              buttonStyle={styles.button}
              text="Save"
              onPress={handleSave}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const createStyles = theme =>
  StyleSheet.create({
    editIconWrapper: {
      alignSelf: 'flex-end',
      backgroundColor: '#4392F9',
      borderRadius: scale(20),
      padding: scale(8),
      marginBottom: scale(10),
      borderColor: '#fff',
      borderWidth: 2,
      ...Shadows.medium,
    },
    profileInfo: {
      gap: scale(10),
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: scale(12),
      marginBottom: scale(20),
    },

    infoTab: {
      flex: 1,
      paddingVertical: scale(10),
      borderRadius: scale(8),
      alignItems: 'center',
      borderWidth: 1,
      backgroundColor: theme.background,
      borderColor: theme.border,
    },

    activeTab: {
      backgroundColor: Colors.primary,
    },

    tabText: {
      fontSize: FontSizes.small,
      color: theme.text,
      fontWeight: FontWeights.medium,
    },

    activeTabText: {
      fontSize: FontSizes.small,
      color: Colors.white,
      fontWeight: FontWeights.bold,
    },

    section: {
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.card,
      borderRadius: scale(12),
      padding: scale(16),
      marginBottom: scale(24),
      ...Shadows.light,
    },

    sectionTitle: {
      fontSize: FontSizes.large,
      fontWeight: FontWeights.bold,
      color: theme.text,
      marginBottom: scale(16),
      borderLeftWidth: scale(4),
      borderLeftColor: Colors.primary,
      paddingLeft: scale(10),
    },

    inputContainer: {
      backgroundColor: theme.background,
      borderRadius: scale(10),
      paddingHorizontal: scale(12),
      paddingVertical: scale(6),
      marginBottom: scale(16),
      borderWidth: 1,
      borderColor: theme.border,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: scale(15),
      marginBottom: scale(40),
    },
    button: {
      flex: 1,
    },
    close: {
      backgroundColor: Colors.gray,
    },
  });

export default ProfileEditScreen;
