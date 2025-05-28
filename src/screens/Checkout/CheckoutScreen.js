import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import {
  AddIcon,
  EditIcon_2,
  LocationIcon_2,
  StartIcon,
} from '../../assets/icons/Icons';
import commonStyles from '../../styles/commonStyles';
import FastImage from 'react-native-fast-image';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Button} from '../../components/ui/button/Button';
import {useTheme} from '../../contexts/ThemeContext';
import createStyles from './Checkout.styles';
import {getCurrentUser} from '../../utils/storage';
import LoadingOverlay from '../../components/lottie/LoadingOverlay';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const {product} = useRoute().params || {};
  const {theme} = useTheme();
  const styles = createStyles(theme);

  console.log(product);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const handlePlaceOrder = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'Placeorder',
      params: {product},
    });
  }, [navigation, product]);

  const handleShipping = useCallback(() => {
    const addressString = user.address
      ? `${user.address.address}, ${user.address.city}, ${user.address.country}`
      : 'N/A';

    navigation.navigate('NoBottomTab', {
      screen: 'Shipping',
      params: {
        order: {
          product,
          user,
          address: addressString,
          createdAt: new Date().toISOString(),
        },
      },
    });
  }, [navigation, user, product]);

  const handleMap = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'MapPicker',
    });
  }, [navigation]);

  const handleEdit = useCallback(() => {
    navigation.navigate('NoBottomTab', {
      screen: 'ProfileEdit',
      params: {user},
    });
  }, [navigation, user]);

  const renderProduct = useCallback(
    (item, index = 0) => {
      const price = parseFloat((item.price ?? '0').toString().replace('₹', ''));
      const originalPrice = (
        price /
        (1 - item.discountPercentage / 100)
      ).toFixed(0);
      return (
        <TouchableOpacity
          key={item.id || index}
          style={styles.itemContainer}
          onPress={handlePlaceOrder}>
          <View style={[commonStyles.row, styles.productContainer]}>
            <View>
              <FastImage
                source={{
                  uri: item.thumbnail,
                  priority: FastImage.priority.normal,
                }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.cover}
                cache={FastImage.cacheControl.immutable}
              />
            </View>
            <View style={styles.detailsContainer}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.productName}>
                {item.title || 'N/A'}
              </Text>
              {item.colorName && (
                <View style={styles.variationsContainer}>
                  <Text style={styles.variationsLabel}>Color: </Text>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={[
                        styles.colorOption,
                        {backgroundColor: item.selectedColor},
                      ]}>
                      <Text style={styles.colorText}>{item.colorName}</Text>
                    </View>
                  </View>
                </View>
              )}
              {item.sizeName && (
                <View style={styles.variationsContainer}>
                  <Text style={styles.variationsLabel}>Size: </Text>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.colorOption}>
                      <Text style={styles.colorText}>{item.sizeName}</Text>
                    </View>
                  </View>
                </View>
              )}
              <View style={styles.variationsContainer}>
                <Text style={styles.variationsLabel}>Quantity: </Text>
                <Text style={styles.colorText}>{item.quantity}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <View style={styles.stars}>
                  {[...Array(5)].map((_, i) => {
                    const average = item.rating || 0;
                    const fillColor =
                      i + 1 <= Math.floor(average)
                        ? '#EDB310'
                        : i + 1 === Math.ceil(average) &&
                          !Number.isInteger(average)
                        ? '#EDB31080'
                        : '#ccc';
                    return (
                      <StartIcon
                        key={i}
                        fill={fillColor}
                        style={styles.starIcon}
                      />
                    );
                  })}
                </View>
                <Text style={styles.ratingText}>
                  {item.rating?.toLocaleString() || 0}
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.currentPrice}>{item.price}</Text>
                <View style={styles.discountContainer}>
                  <Text style={styles.discountText}>
                    {item.discountPercentage}%
                  </Text>
                  <Text style={styles.originalPrice}>₹{originalPrice}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>
              Total Order ({item.quantity}):
            </Text>
            <Text style={styles.totalPrice}>
              ₹{(price * item.quantity).toFixed(0)}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [handlePlaceOrder, styles],
  );

  if (!user) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.background}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[commonStyles.row, styles.header]}>
          <View style={styles.headerIconContainer}>
            <LocationIcon_2 style={{color: theme.icon}} />
          </View>
          <Text style={styles.headerTitle}>Delivery Information</Text>
        </View>

        {/* User Information */}
        <View style={styles.addressContainer}>
          <View style={styles.addressContent}>
            <View style={[commonStyles.rowSpaceBetween, styles.addressHeader]}>
              <Text style={styles.label}>User Information:</Text>
              <TouchableOpacity onPress={handleEdit}>
                <EditIcon_2 style={{color: theme.icon}} />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.inputLabel}>
                Name: {user.username || 'N/A'}
              </Text>
            </View>
            <View>
              <Text style={styles.inputLabel}>
                Phone: {user.phone || 'N/A'}
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.inputLabel}>
                Address:{' '}
                {user.address
                  ? `${user.address.address}, ${user.address.city}`
                  : 'N/A'}
              </Text>
            </View>
            {/* {user.email && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email: {user.email}</Text>
              </View>
            )} */}
          </View>
          <TouchableOpacity
            onPress={handleMap}
            style={[commonStyles.rowCenter, styles.addressIconContainer]}>
            <AddIcon style={{color: theme.icon}} />
          </TouchableOpacity>
        </View>

        {/* Shopping List */}
        <View style={styles.shopContainer}>
          <Text style={styles.title}>Shopping List</Text>
          <View style={styles.productsScrollContent}>
            {isLoading ? (
              <View style={styles.itemContainer}>
                <View style={[commonStyles.row, styles.productContainer]}>
                  <View
                    style={[
                      styles.image,
                      {backgroundColor: theme.placeholder || '#e0e0e0'},
                    ]}
                  />
                  <View style={styles.detailsContainer}>
                    <View
                      style={[
                        styles.productName,
                        {
                          height: 20,
                          backgroundColor: theme.placeholder || '#e0e0e0',
                          marginBottom: 8,
                        },
                      ]}
                    />
                    <View style={styles.variationsContainer}>
                      <View
                        style={[
                          styles.variationsLabel,
                          {
                            height: 16,
                            width: 50,
                            backgroundColor: theme.placeholder || '#e0e0e0',
                          },
                        ]}
                      />
                    </View>
                    <View style={styles.ratingContainer}>
                      <View
                        style={[
                          styles.ratingText,
                          {
                            height: 16,
                            width: 40,
                            backgroundColor: theme.placeholder || '#e0e0e0',
                          },
                        ]}
                      />
                      <View style={styles.stars}>
                        {[...Array(5)].map((_, i) => (
                          <View
                            key={i}
                            style={[
                              styles.starIcon,
                              {
                                backgroundColor: theme.placeholder || '#e0e0e0',
                                borderRadius: 4,
                              },
                            ]}
                          />
                        ))}
                      </View>
                    </View>
                    <View style={styles.priceContainer}>
                      <View
                        style={[
                          styles.currentPrice,
                          {
                            height: 20,
                            width: 80,
                            backgroundColor: theme.placeholder || '#e0e0e0',
                          },
                        ]}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.totalContainer}>
                  <View
                    style={[
                      styles.totalLabel,
                      {
                        height: 16,
                        width: 100,
                        backgroundColor: theme.placeholder || '#e0e0e0',
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.totalPrice,
                      {
                        height: 20,
                        width: 80,
                        backgroundColor: theme.placeholder || '#e0e0e0',
                      },
                    ]}
                  />
                </View>
              </View>
            ) : product ? (
              renderProduct(product)
            ) : (
              <Text style={{textAlign: 'center', padding: 20, color: 'gray'}}>
                Không có sản phẩm để hiển thị
              </Text>
            )}
          </View>
          <Button
            text="Proceed to Payment"
            onPress={handleShipping}
            buttonStyle={{backgroundColor: '#F83758', borderRadius: 4}}
            width="100%"
            height={55}
            textStyle={{fontSize: 17, fontWeight: '600'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(CheckoutScreen);
