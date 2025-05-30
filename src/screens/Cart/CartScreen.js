import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {Swipeable} from 'react-native-gesture-handler';
import {useQuery, useQueryClient} from '@tanstack/react-query';

import styles from './Cart.styles';
import commonStyles from '../../styles/commonStyles';
import {CouponsIcon, MinusIcon, PlusIcon} from '../../assets/icons/Icons';
import {
  TextButton,
  Button,
  IconButton,
} from '../../components/ui/button/Button';
import {
  fetchCartByUserId,
  updateCartItemInApi,
  deleteCartItemInApi,
} from '../../api/cartApi';
import {storage} from '../../utils/storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {scale} from '../../utils/scaling';
import {showMessage} from 'react-native-flash-message';

const ProductItem = React.memo(({item, onDelete, onUpdateQuantity}) => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const increase = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  const decrease = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  const handleDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onDelete(item.id);
    });
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <Animated.View style={{opacity: fadeAnim}}>
          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Xoá</Text>
          </TouchableOpacity>
        </Animated.View>
      )}>
      <Animated.View style={[styles.productItemContainer, {opacity: fadeAnim}]}>
        <View style={[commonStyles.row, styles.productContainer]}>
          <FastImage
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: item.thumbnail,
              priority: FastImage.priority.normal,
            }}
          />
          <View style={styles.detailsContainer}>
            <Text style={styles.productName} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.productDescription}>
              {item.price}{' '}
              {item.discountPercentage && `(-${item.discountPercentage}%)`}
            </Text>
            <View style={styles.bottomRow}>
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
                      onUpdateQuantity(item.id, num);
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
  const rawPrice = item?.price;
  const price =
    typeof rawPrice === 'string'
      ? parseFloat(rawPrice.replace(/[^\d.]/g, ''))
      : typeof rawPrice === 'number'
      ? rawPrice
      : 0;
  return `₹${(price * quantity).toFixed(2)}`;
};

const CartScreen = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const {width} = Dimensions.get('window');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = storage.getString('currentUser');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        if (parsed?.id) {
          setUserId(parsed.id);
        }
      } catch (err) {
        console.error('Parse user error:', err);
      }
    }
  }, []);

  const {
    data: apiCart,
    isLoading: apiLoading,
    isError: apiError,
    error: apiErrorObj,
  } = useQuery({
    queryKey: ['carts', userId],
    queryFn: () => fetchCartByUserId(userId),
    enabled: !!userId,
  });

  const totalAmount = useMemo(() => {
    return (apiCart?.products || []).reduce((sum, item) => {
      const rawPrice = item?.price;
      const price =
        typeof rawPrice === 'string'
          ? parseFloat(rawPrice.replace(/[^\d.]/g, ''))
          : typeof rawPrice === 'number'
          ? rawPrice
          : 0;
      return sum + price * (item.quantity || 1);
    }, 0);
  }, [apiCart]);

  const handleShipping = useCallback(() => {
    navigation.navigate('NoBottomTab', {screen: 'Shipping'});
  }, [navigation]);

  const syncCartData = useCallback(async () => {
    try {
      setLoading(true);
      if (!apiCart) {
        setProducts([]);
        setError(null);
        return;
      }

      if (apiCart.products && apiCart.products.length > 0) {
        setProducts(apiCart.products);
        setError(null);
      } else {
        setProducts([]);
        setError(null);
      }
    } catch (e) {
      console.error('Sync cart error:', e);
      setError('Lỗi khi đồng bộ giỏ hàng');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [apiCart]);

  const handleDelete = useCallback(
    async variantId => {
      try {
        await deleteCartItemInApi(userId, variantId);
        if (apiCart?.products) {
          setProducts(prev => prev.filter(item => item.id !== variantId));
          queryClient.invalidateQueries(['carts', userId]);
        }
      } catch (e) {
        showMessage({
          message: 'Giỏ hàng',
          description: 'Xóa khỏi giỏ hàng thành công',
          type: 'danger',
          duration: 2000,
        });
      }
    },
    [userId, queryClient, apiCart],
  );

  const handleUpdateQuantity = useCallback(
    async (variantId, newQuantity) => {
      try {
        await updateCartItemInApi(userId, variantId, newQuantity);
        if (apiCart?.products) {
          setProducts(prev =>
            prev.map(item =>
              item.id === variantId ? {...item, quantity: newQuantity} : item,
            ),
          );
          queryClient.invalidateQueries(['carts', userId]);
        }
      } catch (e) {
        showMessage({
          message: 'Giỏ hàng',
          description: 'Cập nhật giỏ hàng không thành công',
          type: 'danger',
          duration: 2000,
        });
      }
    },
    [userId, queryClient, apiCart],
  );

  useFocusEffect(
    useCallback(() => {
      syncCartData();
    }, [syncCartData]),
  );

  if (loading || apiLoading) {
    const skeletonCount = apiCart?.products?.length || 3;

    return (
      <View style={{padding: scale(16)}}>
        {Array(skeletonCount)
          .fill(0)
          .map((_, index) => (
            <View
              key={index}
              style={{
                padding: 16,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                marginBottom: 16,
              }}>
              <SkeletonPlaceholder borderRadius={8} speed={1200}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 16}}>
                  <SkeletonPlaceholder.Item
                    width={scale(120)}
                    height={scale(135)}
                    borderRadius={4}
                  />

                  <View style={{flexDirection: 'column'}}>
                    <SkeletonPlaceholder.Item
                      width={width - scale(120) - scale(16 * 3)}
                      height={24}
                      borderRadius={4}
                      marginBottom={16}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - scale(120) - scale(16 * 10)}
                      height={24}
                      borderRadius={4}
                      marginBottom={16}
                    />
                    <SkeletonPlaceholder.Item
                      width={width - scale(120) - scale(16 * 3)}
                      height={24}
                      borderRadius={4}
                    />
                  </View>
                </View>
              </SkeletonPlaceholder>
            </View>
          ))}
      </View>
    );
  }

  if (error || apiError) {
    return (
      <View style={commonStyles.center}>
        <Text style={{color: 'red'}}>{error || apiErrorObj?.message}</Text>
      </View>
    );
  }

  if (!apiCart?.products || apiCart.products.length === 0) {
    return (
      <View style={[commonStyles.center, {flex: 1, padding: 20}]}>
        <Text style={{fontSize: 18, color: '#666', textAlign: 'center'}}>
          Your cart is empty. Start shopping to add items!
        </Text>
      </View>
    );
  }

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          {apiCart.products.map(item => (
            <ProductItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ))}
          <PaymentDetails
            totalAmount={totalAmount}
            onProceed={handleShipping}
          />
        </View>
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
            height={48}
            textStyle={{fontSize: 17, fontWeight: '600'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(CartScreen);
