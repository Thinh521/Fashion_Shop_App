import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import createStyles from './order.styles';
import {
  getCurrentUser,
  getOrder,
  removeOrder,
  updateOrderStatus,
} from '../../utils/storage';
import FastImage from 'react-native-fast-image';
import commonStyles from '../../styles/commonStyles';
import {Swipeable} from 'react-native-gesture-handler';
import {Button} from '../../components/ui/button/Button';
import {Colors} from '../../theme/theme';
import {useNavigation} from '@react-navigation/core';

const OrderScreen = () => {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const user = getCurrentUser();
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('pending');

  const ORDER_TAB = [
    {label: 'Chờ xác nhận', value: 'pending'},
    {label: 'Chờ lấy hàng', value: 'shipping'},
    {label: 'Đang giao', value: 'delivering'},
    {label: 'Đã giao', value: 'completed'},
    {label: 'Trả hàng', value: 'returned'},
    {label: 'Đã hủy', value: 'cancelled'},
  ];

  const getStatusLabel = status => {
    const found = ORDER_TAB.find(tab => tab.value === status);
    return found ? found.label : 'Không xác định';
  };

  const filteredOrders = orders.filter(
    order => order.status === selectedStatus,
  );

  const animDelete = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {});
  };

  const handleCancelOrder = useCallback(
    async orderId => {
      try {
        await updateOrderStatus(user.id, orderId, 'cancelled');
        const updatedOrders = await getOrder(user.id);
        setOrders(updatedOrders);
      } catch (error) {
        console.error('Lỗi khi hủy đơn hàng:', error);
      }
    },
    [user?.id],
  );

  useEffect(() => {
    const loadOrders = async () => {
      if (user?.id) {
        try {
          const fetchedOrders = await getOrder(user.id);
          setOrders(fetchedOrders);
        } catch (error) {
          console.error('Lỗi khi tải đơn hàng:', error);
        }
      }
    };
    loadOrders();
  }, [user?.id]);

  if (!orders.length) {
    return (
      <View style={[styles.center, {backgroundColor: theme.background}]}>
        <Text style={[styles.emptyText, {color: theme.text}]}>
          Bạn chưa có đơn hàng nào
        </Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor: theme.background, padding: 16, flex: 1}}>
      <View>
        <FlatList
          horizontal
          data={ORDER_TAB}
          keyExtractor={item => item.value}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => setSelectedStatus(item.value)}
              style={[
                styles.orderTab,
                {borderBottomWidth: selectedStatus === item.value ? 2 : 0},
              ]}>
              <Text
                style={{
                  color:
                    selectedStatus === item.value ? Colors.primary : theme.text,
                  fontWeight: 'bold',
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical: 16}}
        renderItem={({item}) => (
          <Swipeable
            renderRightActions={() => (
              <Animated.View style={{opacity: fadeAnim}}>
                <TouchableOpacity
                  onPress={() => {
                    animDelete();
                    handleCancelOrder(item.id);
                  }}
                  style={styles.deleteButton}>
                  <Text style={styles.deleteText}>Hủy</Text>
                </TouchableOpacity>
              </Animated.View>
            )}>
            <View>
              <View style={styles.card}>
                <View style={styles.header}>
                  <Text style={styles.orderId}>Đơn hàng</Text>
                  <Text
                    style={[
                      styles.status,
                      {
                        color:
                          item.status === 'pending' ? theme.text : theme.text,
                      },
                    ]}>
                    <Text>{getStatusLabel(item.status)}</Text>
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.orderBox}>
                  <FastImage
                    source={{
                      uri: item.product?.thumbnail,
                      priority: FastImage.priority.normal,
                    }}
                    style={styles.image}
                    resizeMode={FastImage.resizeMode.cover}
                    cache={FastImage.cacheControl.immutable}
                  />
                  <View style={{flex: 1}}>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailName, {color: theme.text}]}>
                        {item.product?.title || 'Không có tên sản phẩm'}
                      </Text>
                    </View>
                    <View style={commonStyles.row}>
                      {item.product?.colorName && (
                        <View style={styles.detailRow}>
                          <Text
                            style={[styles.detailText, {color: theme.text}]}>
                            Màu: {item.product?.colorName || 'Không có màu'}
                          </Text>
                        </View>
                      )}
                      {item.product?.sizeName && (
                        <View style={styles.detailRow}>
                          <Text
                            style={[styles.detailText, {color: theme.text}]}>
                            Kích thước:{' '}
                            {item.product?.sizeName || 'Không có kích thước'}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailText, {color: theme.text}]}>
                        Số lượng:{' '}
                        {item.product?.quantity ?? 'Không có số lượng'}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailText, {color: theme.text}]}>
                        Giá:{' '}
                        {item.product?.price
                          ? `${item.product.price.toLocaleString()} VNĐ`
                          : 'Không có giá'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.cardFooter}>
                  <Button
                    text="Đã nhận được hàng"
                    onPress={() =>
                      navigation.navigate('NoBottomTab', {
                        screen: 'ProductReview',
                        params: {order: item},
                      })
                    }
                    textStyle={[styles.buttonText, {color: Colors.primary}]}
                    buttonStyle={[styles.buttonFooter, styles.buttonFooterLine]}
                  />
                  <Button
                    text="Theo dõi đơn hàng"
                    onPress={() =>
                      navigation.navigate('NoBottomTab', {
                        screen: 'OrderDetail',
                        params: {order: item},
                      })
                    }
                    textStyle={styles.buttonText}
                    buttonStyle={styles.buttonFooter}
                  />
                </View>
              </View>
            </View>
          </Swipeable>
        )}
      />
    </View>
  );
};

export default OrderScreen;
