import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import createStyles from './Setting.styles';
import commonStyles from '../../styles/commonStyles';
import Images from '../../assets/images/Images';
import {
  BinIcon,
  BlogIcon,
  ChatIcon,
  DarkIcon,
  DeliverIcon,
  EditIcon,
  EvaluateIcon,
  LightIcon,
  PaperIcon,
  RightIcon_3,
  SettingIcon,
  ShopIcon,
  SupportIcon,
} from '../../assets/icons/Icons';
import {Button} from '../../components/ui/button/Button';
import {
  clearCurrentUser,
  getCurrentUser,
  getCurrentUserId,
  getTotalOrderCount,
} from '../../utils/storage';
import {CommonActions, useNavigation} from '@react-navigation/core';
import CartIconHeader from '../../components/CartIcon/CartIcon';
import {scale} from '../../utils/scaling';
import {useTheme} from '../../contexts/ThemeContext';
import {Colors} from '../../theme/theme';
import LoadingOverlay from '../../components/lottie/LoadingOverlay';

const SettingScreen = () => {
  const userId = getCurrentUserId();
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const {theme, toggleTheme, isDarkMode} = useTheme();
  const styles = createStyles(theme);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const updateOrderCount = () => {
      const count = getTotalOrderCount(userId);
      setTotalQuantity(count);
    };

    updateOrderCount();
  }, [userId]);

  const handleLogout = async () => {
    await clearCurrentUser();
    setUser(null);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Home'}],
      }),
    );
  };

  const navigationToProfileEdit = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'ProfileEdit',
      params: {
        user: user,
      },
    });
  };

  const NavigationToCart = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Cart',
    });
  };

  const navigationToOrder = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Order',
    });
  };

  if (!user) {
    return <LoadingOverlay />;
  }

  return (
    <View style={{backgroundColor: theme.background, flex: 1}}>
      <View style={styles.profileHeaderWrapper}>
        <View style={[commonStyles.rowSpaceBetween, styles.profileHeader]}>
          <View style={styles.profileShop}>
            <ShopIcon style={styles.icon} />
            <Text style={[styles.headerText, {color: theme.text}]}>
              Bắt đầu bán
            </Text>
          </View>
          <View style={[commonStyles.rowCenter, styles.profileHeaderRight]}>
            <TouchableOpacity onPress={NavigationToCart}>
              <CartIconHeader />
            </TouchableOpacity>
            <TouchableOpacity>
              <SettingIcon width={20} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme}>
              {isDarkMode ? (
                <DarkIcon style={styles.icon} />
              ) : (
                <LightIcon style={styles.icon} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={{padding: scale(16), backgroundColor: theme.background}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileContainer}>
          <View style={styles.profileInfo}>
            <View style={styles.avatarWrapper}>
              <View style={[styles.avatarCircle, {borderColor: theme.border}]}>
                <FastImage
                  style={styles.avatar}
                  source={Images.profile.avatar}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <TouchableOpacity
                onPress={navigationToProfileEdit}
                style={[commonStyles.rowCenter, styles.editIconWrapper]}>
                <EditIcon fill={theme.icon} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.profileName, {color: theme.text}]}>
              {user?.username || 'No name'}
            </Text>
          </View>

          <View style={{marginBottom: scale(20)}}>
            <View
              style={[commonStyles.rowSpaceBetween, {marginBottom: scale(15)}]}>
              <Text style={[styles.profileTitle, {color: theme.text}]}>
                Đơn mua
              </Text>
              <TouchableOpacity onPress={navigationToOrder}>
                <Text style={{color: Colors.primary, fontWeight: '500'}}>
                  Xem lịch sử mua
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={[commonStyles.rowSpaceBetween, {gap: scale(10)}]}>
                <TouchableOpacity
                  onPress={navigationToOrder}
                  style={[
                    styles.box,
                    {
                      backgroundColor: theme.card,
                      borderColor: theme.border,
                    },
                  ]}
                  activeOpacity={0.7}>
                  <View style={{position: 'relative'}}>
                    <PaperIcon style={styles.icon} />
                    {totalQuantity > 0 && (
                      <View style={styles.badge}>
                        <Text
                          numberOfLines={1}
                          ellipsizeMode="clip"
                          style={styles.badgeText}>
                          {totalQuantity}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text
                    style={[styles.label, {color: theme.text}]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Chờ xác nhận
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.box,
                    {backgroundColor: theme.card, borderColor: theme.border},
                  ]}
                  activeOpacity={0.7}>
                  <BinIcon style={styles.icon} />
                  <Text
                    style={[styles.label, {color: theme.text}]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Chờ lấy hàng
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.box,
                    {backgroundColor: theme.card, borderColor: theme.border},
                  ]}
                  activeOpacity={0.7}>
                  <DeliverIcon style={styles.icon} />
                  <Text
                    style={[styles.label, {color: theme.text}]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Giao hàng
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.box,
                    {backgroundColor: theme.card, borderColor: theme.border},
                  ]}
                  activeOpacity={0.7}>
                  <EvaluateIcon style={styles.icon} />
                  <Text
                    style={[styles.label, {color: theme.text}]}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Đánh giá
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <Text
              style={[
                styles.profileTitle,
                {color: theme.text, marginBottom: scale(15)},
              ]}>
              Hỗ trợ
            </Text>

            <View
              style={[
                styles.supportItemsContainer,
                {backgroundColor: theme.card, borderColor: theme.border},
              ]}>
              <TouchableOpacity style={styles.supportItem}>
                <View style={styles.itemContent}>
                  <View
                    style={[
                      styles.iconContainer,
                      {backgroundColor: theme.background},
                    ]}>
                    <SupportIcon
                      width={scale(20)}
                      height={scale(20)}
                      style={styles.icon}
                    />
                  </View>
                  <Text style={[styles.itemText, {color: theme.text}]}>
                    Trung tâm trợ giúp
                  </Text>
                </View>
                <RightIcon_3 style={styles.rightIcon} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.supportItem}>
                <View style={styles.itemContent}>
                  <View
                    style={[
                      styles.iconContainer,
                      {backgroundColor: theme.background},
                    ]}>
                    <ChatIcon
                      width={scale(20)}
                      height={scale(20)}
                      style={styles.icon}
                    />
                  </View>
                  <Text style={[styles.itemText, {color: theme.text}]}>
                    Trò chuyện với chúng tôi
                  </Text>
                </View>
                <RightIcon_3 style={styles.rightIcon} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.supportItem, styles.lastItem]}>
                <View style={styles.itemContent}>
                  <View
                    style={[
                      styles.iconContainer,
                      {backgroundColor: theme.background},
                    ]}>
                    <BlogIcon
                      width={scale(20)}
                      height={scale(20)}
                      style={styles.icon}
                    />
                  </View>
                  <Text style={[styles.itemText, {color: theme.text}]}>
                    Bài viết
                  </Text>
                </View>
                <RightIcon_3 style={styles.rightIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <Button
            text="Logout"
            width="100%"
            onPress={handleLogout}
            buttonStyle={[
              styles.primaryButton,
              {backgroundColor: Colors.primary},
            ]}
            textStyle={{color: '#FFFFFF', fontSize: 16, fontWeight: '600'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
