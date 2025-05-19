import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Swipeable} from 'react-native-gesture-handler';

import styles from './Search.styles';
import commonStyles from '../../styles/commonStyles';
import {CouponsIcon, MinusIcon, PlusIcon} from '../../assets/icons/Icons';
import {
  TextButton,
  Button,
  IconButton,
} from '../../components/ui/button/Button';
import {
  getCart,
  getCurrentUser,
  removeFromCart,
  updateCartQuantity,
} from '../../utils/storage';

const ProductItem = React.memo(({item, onDelete}) => {
  const convertHexToColorName = hex => {
    const colorMap = {
      '#000': 'Black',
      '#000000': 'Black',
      '#fff': 'White',
      '#ffffff': 'White',
      '#ff0000': 'red',
      '#00ff00': 'lime',
      '#000080': 'Blue',
    };
    return colorMap[hex?.toLowerCase()] || hex;
  };

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const updateCartItem = useCallback(async (productItem, newQuantity) => {
    try {
      const user = getCurrentUser();
      if (!user) {
        return;
      }

      await updateCartQuantity(user.id, productItem.variantId, newQuantity);
    } catch (error) {
      console.error('Update cart error:', error);
    }
  }, []);

  const increase = () => {
    if (quantity >= item.availableStock) {
      return;
    }
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartItem(item, newQuantity);
  };

  const decrease = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    updateCartItem(item, newQuantity);
  };

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDelete(item.variantId);
    });
  };

  const renderRightActions = () => (
    <Animated.View style={{opacity: fadeAnim}}>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Xoá</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Animated.View style={[styles.productItemContainer, {opacity: fadeAnim}]}>
        <View style={[commonStyles.row, styles.productContainer]}>
          <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
            source={item.images?.[0]}
          />

          <View style={styles.detailsContainer}>
            {/*Tên sản phẩm */}
            <Text style={styles.productName} numberOfLines={2}>
              {item.productName}
            </Text>

            {/* Giá sản phẩm */}
            <Text style={styles.productDescription}>
              {item.price} {item.discount && `(-${item.discount}%)`}
            </Text>

            {/* Phân loại */}
            <View style={styles.specsContainer}>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Màu: </Text>
                <Text style={styles.specValue}>
                  {convertHexToColorName(item.selectedColor || item.colorName)}
                </Text>
              </View>
              <View style={styles.specItem}>
                <Text style={styles.specLabel}>Size: </Text>
                <Text style={styles.specValue}>
                  {convertHexToColorName(item.selectedSize || item.sizeName)}
                </Text>
              </View>
            </View>

            {/* Dòng 4: Số lượng và tổng */}
            <View style={styles.bottomRow}>
              {/* Phần số lượng */}
              <View style={styles.quantityContainer}>
                <IconButton
                  iconStyle={styles.quantityButton}
                  icon={<MinusIcon fill="#000" width={18} height={18} />}
                  onPress={decrease}
                />

                <TextInput
                  style={styles.quantityInput}
                  value={String(quantity)}
                  onChangeText={text => {
                    const num = parseInt(text);
                    if (!isNaN(num) && num > 0) {
                      setQuantity(num);
                      updateCartItem(item, num);
                    }
                  }}
                  keyboardType="numeric"
                  maxLength={4}
                />

                <IconButton
                  iconStyle={styles.quantityButton}
                  icon={<PlusIcon fill="#000" width={18} height={18} />}
                  onPress={increase}
                />
              </View>

              {/* Phần tổng giá */}
              <Text style={styles.deliveryDate}>
                {calculateItemTotal(item, quantity)}
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </Swipeable>
  );
});

const PaymentDetails = React.memo(({totalAmount, onProceed}) => (
  <View style={styles.paymentContainer}>
    <View style={styles.sectionHeader}>
      <View style={commonStyles.row}>
        <CouponsIcon style={styles.couponIcon} />
        <Text style={styles.sectionTitle}>Apply Coupons</Text>
      </View>
      <TextButton text="Select" textStyle={styles.selectButtonText} />
    </View>

    <View style={styles.divider} />

    <Text style={styles.sectionTitle}>Order Payment Details</Text>

    <View style={styles.paymentRow}>
      <Text style={styles.paymentLabel}>Order Amount</Text>
      <Text style={styles.paymentValue}>₹{totalAmount.toFixed(2)}</Text>
    </View>

    <View style={[styles.paymentRow, {marginBottom: 8}]}>
      <View style={commonStyles.row}>
        <Text style={styles.paymentLabel}>Convenience</Text>
        <TextButton text="Know More" textStyle={styles.linkText} />
      </View>
      <TextButton text="Apply Coupon" textStyle={styles.linkText} />
    </View>

    <View style={styles.paymentRow}>
      <Text style={styles.paymentLabel}>Delivery Fee</Text>
      <Text style={styles.freeText}>Free</Text>
    </View>

    <View style={styles.divider} />

    <View style={styles.paymentRow}>
      <Text style={styles.sectionTitle}>Order Total</Text>
      <Text style={styles.paymentValue}>₹{totalAmount.toFixed(2)}</Text>
    </View>

    <View style={[commonStyles.row, {justifyContent: 'flex-start'}]}>
      <Text style={styles.paymentLabel}>EMI Available</Text>
      <TextButton text="Details" textStyle={styles.linkText} />
    </View>
  </View>
));

const calculateItemTotal = (item, quantity) => {
  const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
  return `₹${(price * quantity).toFixed(2)}`;
};

const EmptyCart = () => (
  <View style={[commonStyles.center, {flex: 1, padding: 20}]}>
    <Text style={{fontSize: 18, color: '#666', textAlign: 'center'}}>
      Your cart is empty. Start shopping to add items!
    </Text>
  </View>
);

const SearchScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalAmount = useMemo(
    () =>
      products.reduce((sum, item) => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
        return sum + price * (item.quantity || 1);
      }, 0),
    [products],
  );

  const handleShipping = useCallback(() => {
    navigation.navigate('NoBottomTab', {screen: 'Shipping'});
  }, [navigation]);

  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const user = getCurrentUser();
      if (!user) {
        setError('Vui lòng đăng nhập để xem giỏ hàng');
        setProducts([]);
        return;
      }

      const cartItems = getCart(user.id);
      if (!cartItems || cartItems.length === 0) {
        setProducts([]);
        return;
      }

      const validatedItems = cartItems.map(item => ({
        ...item,
        quantity: item.quantity || 1,
      }));

      setProducts(validatedItems);
      setError(null);
    } catch (e) {
      console.error('Fetch cart error:', e);
      setError('Lỗi khi tải giỏ hàng');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [fetchCart]),
  );

  const handleDelete = useCallback(async variantId => {
    try {
      const user = getCurrentUser();
      if (!user) {
        setError('User not logged in');
        return;
      }

      await removeFromCart(user.id, variantId);
      setProducts(prev => prev.filter(item => item.variantId !== variantId));
    } catch (e) {
      console.error('Delete item error:', e);
    }
  }, []);

  if (loading) {
    return (
      <View style={commonStyles.center}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.center}>
        <Text style={{color: 'red'}}>{error}</Text>
      </View>
    );
  }

  if (products.length === 0) {
    return <EmptyCart />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={commonStyles.flex1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={commonStyles.flexGrow1}>
          <View style={[commonStyles.screenContainer, styles.background]}>
            {products.map(item => (
              <ProductItem
                key={item.variantId}
                item={item}
                onDelete={handleDelete}
              />
            ))}

            <PaymentDetails
              totalAmount={totalAmount}
              onProceed={handleShipping}
            />
          </View>
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.footerRow}>
            <Text style={styles.totalPrice}>₹{totalAmount.toFixed(2)}</Text>
            <TextButton text="View Details" textStyle={styles.linkText} />
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
      </View>
    </ScrollView>
  );
};

export default React.memo(SearchScreen);
