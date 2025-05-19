import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {
  AddIcon,
  EditIcon_2,
  LocationIcon_2,
  StartIcon,
} from '../../assets/icons/Icons';
import commonStyles from '../../styles/commonStyles';
import FastImage from 'react-native-fast-image';
import styles from './Checkout.styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Button} from '../../components/ui/button/Button';

const CheckoutScreen = () => {
  const {product} = useRoute().params;
  const navigation = useNavigation();

  const handlePlaceoder = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Placeorder',
      params: {product: product},
    });
  };

  const handleShipping = () => {
    navigation.navigate('NoBottomTab', {
      screen: 'Shipping',
    });
  };

  const renderProduct = (item, index = 0) => {
    const price = parseFloat(item.price.replace('₹', ''));
    const originalPrice = (price / (1 - item.discount / 100)).toFixed(0);
    const imageSource =
      typeof item.images[0] === 'string'
        ? {uri: item.images[0]}
        : item.images[0];

    return (
      <TouchableOpacity
        key={item.id || index}
        style={styles.itemContainer}
        onPress={handlePlaceoder}>
        <View style={[commonStyles.row, styles.productContainer]}>
          <View>
            <FastImage
              source={imageSource}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.productName}>{item.productName}</Text>

            <View style={styles.variationsContainer}>
              <Text style={styles.variationsLabel}>Sizes:</Text>
              <View style={{flexDirection: 'row'}}>
                {item.sizes?.map((size, i) => (
                  <View key={i} style={styles.colorOption}>
                    <Text style={styles.colorText}>{size}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                {item.rating?.average ?? 'N/A'}
              </Text>
              <View style={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <StartIcon key={i} style={styles.starIcon} />
                ))}
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.currentPrice}>{item.price}</Text>
              <View style={styles.discountContainer}>
                <Text style={styles.discountText}>-{item.discount}%</Text>
                <Text style={styles.originalPrice}>₹{originalPrice}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Order (1):</Text>
          <Text style={styles.totalPrice}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[commonStyles.screenContainer, styles.background]}>
      <View>
        {/* Header */}
        <View style={[commonStyles.row, styles.header]}>
          <View style={styles.headerIconContainer}>
            <LocationIcon_2 style={styles.locationIcon} />
          </View>
          <Text style={styles.headerTitle}>Delivery Address</Text>
        </View>

        {/* Address */}
        <View style={styles.addressContainer}>
          <View style={styles.addressContent}>
            <View style={[commonStyles.rowSpaceBetween, styles.addressHeader]}>
              <Text style={styles.label}>Address:</Text>
              <View style={styles.addressEditIcon}>
                <EditIcon_2 />
              </View>
            </View>
            <Text style={styles.addressText}>
              216 St Paul's Rd, London N1 2LL, UK
              {'\n'}Contact: +44-784232
            </Text>
          </View>
          <View style={[commonStyles.rowCenter, styles.addressIconContainer]}>
            <AddIcon />
          </View>
        </View>

        {/* Shopping List */}
        <View style={styles.shopContainer}>
          <Text style={styles.title}>Shopping List</Text>

          <ScrollView
            style={styles.productsScrollView}
            contentContainerStyle={styles.productsScrollContent}
            showsVerticalScrollIndicator
            indicatorStyle="black"
            persistentScrollbar
            scrollIndicatorInsets={{right: 1}}>
            {/* Render sản phẩm */}
            {product ? (
              Array.isArray(product) ? (
                product.map((item, index) => renderProduct(item, index))
              ) : (
                renderProduct(product)
              )
            ) : (
              <Text style={{textAlign: 'center', padding: 20, color: 'gray'}}>
                Không có sản phẩm để hiển thị
              </Text>
            )}
          </ScrollView>

          <Button
            text="Proceed to Payment"
            onPress={handleShipping}
            buttonStyle={{backgroundColor: '#F83758', borderRadius: 4}}
            width="100%"
            height={55}
            textStyle={{fontSize: 17, fontWeight: '600'}}
          />
        </View>
      </View>
    </View>
  );
};

export default CheckoutScreen;
